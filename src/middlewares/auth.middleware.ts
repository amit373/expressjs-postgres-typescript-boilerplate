import { NextFunction, Response } from 'express';
import i18next from 'i18next';
import { container } from 'tsyringe';

import { UnauthorizedException } from '@app/exceptions';
import { JwtService } from '@app/services';
import { asyncHandler } from './async-handler.middleware';

const jwtService: JwtService = container.resolve(JwtService);

// @desc   Verify Token Middleware
export const authMiddleware = asyncHandler(async (req: any, _: Response, next: NextFunction): Promise<void> => {
  // 1) Getting token and check of it's there
  let token;
  const { authorization } = req.headers;
  if (authorization?.startsWith('Bearer')) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(' ')[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new UnauthorizedException(i18next.t('ERROR.NOT_LOGGED_IN')));
  }

  // 2) Verification token
  const decoded: any = await jwtService.verifyToken(token);
  if (!decoded || !decoded.id) {
    return next(new UnauthorizedException(i18next.t('ERROR.USER_WITH_TOKEN_NOT_EXIST')));
  }

  // 3) Check if user still exists
  // const currentUser = await userModel.findById(decoded['id']);
  // if (!currentUser) {
  //   return next(new UnauthorizedException(i18next.t('ERROR.USER_WITH_TOKEN_NOT_EXIST')));
  // }

  // Check if user changed password after the token was issued
  // if (currentUser?.changedPasswordAfter(decoded['iat'])) {
  //   return next(new UnauthorizedException(i18next.t('ERROR.RECENTLY_CHANGED_PASSWORD')));
  // }

  // GRANT ACCESS TO PROTECTED ROUTE
  // req['user'] = currentUser;
  return next();
});
