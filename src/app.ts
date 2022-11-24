import 'reflect-metadata'; // Don't change order always import first

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request } from 'express';
import rateLimit from 'express-rate-limit';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import hpp from 'hpp';
import i18next from 'i18next';
import i18nextFsBackend from 'i18next-fs-backend';
import { handle as i18nextMiddlewareHandle, LanguageDetector } from 'i18next-http-middleware';
import { resolve } from 'path';
import swaggerUi from 'swagger-ui-express';
import { container } from 'tsyringe';

import { config } from '@app/config';
import { Locale, RoutesConstants } from '@app/constants';
import { NotFoundException } from '@app/exceptions';
import { LoggerService } from '@app/libs';
import { errorMiddleware } from '@app/middlewares';
import { swaggerSpecsV1, v1Router } from '@app/modules/v1';

const loggerService: LoggerService = container.resolve(LoggerService);

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  if (err) {
    loggerService.error(`UNCAUGHT EXCEPTION!! ${err?.name}: ${err?.message}`);
  }
  process.exit(1);
});

const app: Application = express();

initI18Next();
initializeMiddlewares();
initializeRoutes();
initializeSwagger();
initializeErrorHandling();

function initI18Next(): void {
  void i18next
    .use(LanguageDetector)
    .use(i18nextFsBackend)
    .init({
      ns: ['translation'],
      defaultNS: 'translation',
      backend: {
        loadPath: resolve(__dirname, './locales/{{lng}}/{{ns}}.json'),
      },
      debug: false,
      detection: {
        order: ['querystring', 'cookie'],
        caches: ['cookie'],
      },
      preload: [Locale.EN, Locale.HI],
      saveMissing: false,
      fallbackLng: Locale.EN,
    });

  app.use(i18nextMiddlewareHandle(i18next));
}

function initializeMiddlewares(): void {
  app.use(cors({ origin: config.CORS.ORIGIN, credentials: config.CORS.CREDENTIALS }));
  app.use(hpp());
  app.use(xss());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    rateLimit({
      max: config.RATE_LIMIT.MAX,
      windowMs: config.RATE_LIMIT.WINDOW__MS,
      message: i18next.t('ERROR.TO_MANY_REQUEST'),
    }),
  );
}

function initializeRoutes(): void {
  app.use(v1Router);
}

function initializeSwagger(): void {
  app.use(config.V1_SWAGGER_URL, swaggerUi.serve, swaggerUi.setup(swaggerSpecsV1));
}

function initializeErrorHandling(): void {
  app.all(RoutesConstants.NOT_FOUND, (req: Request) => {
    throw new NotFoundException(i18next.t('ERROR.NOT_FOUND', { message: req?.originalUrl }));
  });
  app.use(errorMiddleware);
}

export default app;
