import { injectable } from 'tsyringe';
import { Logger } from 'winston';
import { logger } from './logger';

type IContext =
  | {
      controller?: string;
      method?: string;
      status?: number;
      function?: string;
    }
  | string;

@injectable()
export class LoggerService {
  private context?: IContext;
  private readonly _logger: Logger = logger;

  public get logger(): Logger {
    return this._logger;
  }

  public setContext(context: IContext): void {
    this.context = context;
  }

  public info(message: any, context?: IContext): Logger {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.info(msg as string, { context, ...meta });
    }

    return this._logger.info(message, { context });
  }

  public error(message: any, context?: IContext, trace?: string): Logger {
    context = context || this.context;

    if (message instanceof Error) {
      const { message: msg, ...meta } = message;

      return this._logger.error(msg, {
        context,
        stack: [trace || message.stack],
        ...meta,
      });
    }

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.error(msg as string, {
        context,
        stack: [trace],
        ...meta,
      });
    }

    return this._logger.error(message, { context, stack: [trace] });
  }

  public warn(message: any, context?: IContext): Logger {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.warn(msg as string, { context, ...meta });
    }

    return this._logger.warn(message, { context });
  }

  public debug?(message: any, context?: IContext): Logger {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.debug(msg as string, { context, ...meta });
    }

    return this._logger.debug(message, { context });
  }

  public verbose?(message: any, context?: IContext): Logger {
    context = context || this.context;

    if (typeof message === 'object') {
      const { message: msg, ...meta } = message;

      return this._logger.verbose(msg as string, { context, ...meta });
    }

    return this._logger.verbose(message, { context });
  }
}
