import { NextFunction, Request, Response } from 'express';
import i18next from 'i18next';

import { config } from '@app/config';
import { HttpStatus } from '@app/constants';
import { UnauthorizedException } from '@app/exceptions';
import { logger } from '@app/libs';

const logError = (err: any, req: Request, res: Response): void => {
  const message: string = i18next.t(err?.message || res?.statusMessage || 'ERROR.SOMETHING_WENT_WRONG');
  logger.error(`${err?.status} - ${req.originalUrl} [${req.method}] - ${message} `);
};

const handleJWTError = (err: any): UnauthorizedException => {
  const error = { ...err, message: i18next.t('ERROR.INVALID_TOKEN') };
  return new UnauthorizedException(error.message);
};

const handleJWTExpiredError = (err: any): UnauthorizedException => {
  const error = { ...err, message: i18next.t('ERROR.TOKEN_EXPIRED') };
  return new UnauthorizedException(error.message);
};

const sendError = (err: any, req: Request, res: Response): Response<any, Record<string, any>> => {
  const message: string = i18next.t(err.message);
  if (config.isDevelopment) {
    console.error('Error 💥', {
      status: err.status,
      method: req.method,
      path: req.path,
      timestamp: new Date(),
      message,
    });
  }
  logError(err, req, res);
  return res.status(err.status).json({
    status: err.status,
    message,
  });
};

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction): void => {
  try {
    let error = { ...err }; // Don't change to const
    error.status = err?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    error.message = i18next.t(err?.message || 'ERROR.INTERNAL_SERVER_ERROR');
    if (error?.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (error?.name === 'TokenExpiredError') error = handleJWTExpiredError(err);
    sendError(error, req, res);
  } catch (error) {
    next(error);
  }
};
