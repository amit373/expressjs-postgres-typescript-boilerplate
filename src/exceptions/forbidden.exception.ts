import { HttpStatus } from '@app/constants';
import i18next from 'i18next';
import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  public status: number = HttpStatus.FORBIDDEN;
  public message: string;

  constructor(message?: string) {
    super(message);
    this.message = i18next.t(message || 'HTTP.FORBIDDEN');
    Error.captureStackTrace(this, this.constructor);
  }
}
