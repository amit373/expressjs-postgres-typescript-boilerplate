import 'reflect-metadata'; // Don't change order always import first

import { config } from '@app/config';
import { LoggerService } from '@app/libs';
import { database } from '@app/models';
import { Server } from 'http';
import { container } from 'tsyringe';
import App from './app';

const loggerService: LoggerService = container.resolve(LoggerService);
let server: Server;

/**
 * @description Start NodeJS server...
 * @return {Void}
 */
async function bootstrap(): Promise<void> {
  try {
    await database.authenticate().then(() => {
      App.listen(() => {
        loggerService.info('Database connected 🔥');
        loggerService.info(`🚀 Server listening on the port ${config.PORT} ENV: ${config.NODE_ENV} mode...`, {
          controller: 'server.ts',
          function: 'bootstrap',
        });
      });
    });
  } catch (error) {
    loggerService.error(`Database not connected: ${error?.message}`, {
      controller: 'server.ts',
      function: 'bootstrap',
    });
    process.exit(1);
  }
}

/**
 * @description Handle Signal and unknown errors.
 * @param {String} event
 * @param {any} payload
 * @param {'error' | 'code' | 'signal'} type
 * @return {Void}
 */
function handleShutDownError(event: string, payload: any, type: 'error' | 'code' | 'signal'): void {
  console.log(`👋 ${event?.toLocaleUpperCase()} RECEIVED. Shutting down gracefully`);
  if (type === 'error' && (payload as {})) {
    loggerService.info(`${event.toLocaleUpperCase()}! ${payload?.name}: ${payload?.message}`, {
      controller: 'index.ts [Root]',
      function: 'handleShutDownError',
    });

    loggerService.error(`${event.toLocaleUpperCase()}! ${payload?.name}: ${payload?.message}`);
  }
  server?.close(() => {
    console.log('💥 Process terminated!');
    process.exit(type === 'code' ? (payload as number) : 1);
  });
}

process.on('exit', (code: number) => handleShutDownError('exit', code, 'code'));
process.on('SIGINT', (signal: NodeJS.Signals) => handleShutDownError('SIGINT', signal, 'signal'));
process.on('SIGUSR1', (signal: NodeJS.Signals) => handleShutDownError('SIGUSR1', signal, 'signal'));
process.on('SIGTERM', (signal: NodeJS.Signals) => handleShutDownError('SIGTERM', signal, 'signal'));
process.on('SIGQUIT', (signal: NodeJS.Signals) => handleShutDownError('SIGQUIT', signal, 'signal'));
process.on('unhandledRejection', (reason: unknown) => handleShutDownError('unhandledRejection', reason, 'error'));

void bootstrap();
