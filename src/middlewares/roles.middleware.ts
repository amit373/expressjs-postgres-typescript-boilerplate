import { NextFunction, Request, Response } from 'express';
import i18next from 'i18next';

import { UserRoles } from '@app/constants';
import { ForbiddenException } from '@app/exceptions';

export const restrictTo =
  (...roles: UserRoles[]) =>
  (req: Request, _: Response, next: NextFunction): void => {
    const { role } = req['user'];
    if (!roles.includes(role)) {
      throw new ForbiddenException(i18next.t('ERROR.PERMISSION_DENIED'));
    }
    return next();
  };
