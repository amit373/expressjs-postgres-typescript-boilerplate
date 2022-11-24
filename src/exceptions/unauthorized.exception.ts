import { HttpStatus } from '@app/constants';
import i18next from 'i18next';
import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  public status: number = HttpStatus.UNAUTHORIZED;
  public message: string;

  constructor(message?: string) {
    super(message);
    this.message = i18next.t(message || 'HTTP.UNAUTHORIZED');
    Error.captureStackTrace(this, this.constructor);
  }
}
