import { HttpStatus } from '@app/constants';
import i18next from 'i18next';

export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(message: string, status?: number) {
    super(message);
    this.message = i18next.t(message || 'HTTP.INTERNAL_SERVER_ERROR');
    this.status = status || HttpStatus.INTERNAL_SERVER_ERROR;
    Error.captureStackTrace(this, this.constructor);
  }
}
