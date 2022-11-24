import { HttpStatus } from '@app/constants';
import i18next from 'i18next';
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  public status: number = HttpStatus.BAD_REQUEST;
  public message: string;

  constructor(message?: string) {
    super(message);
    this.message = i18next.t(message || 'HTTP.BAD_REQUEST');
    Error.captureStackTrace(this, this.constructor);
  }
}
