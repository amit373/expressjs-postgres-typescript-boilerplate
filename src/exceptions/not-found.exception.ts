import { HttpStatus } from '@app/constants';
import i18next from 'i18next';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  public status: number = HttpStatus.NOT_FOUND;
  public message: string;

  constructor(message?: string) {
    super(message);
    this.message = i18next.t(message || 'HTTP.NOT_FOUND');
    Error.captureStackTrace(this, this.constructor);
  }
}
