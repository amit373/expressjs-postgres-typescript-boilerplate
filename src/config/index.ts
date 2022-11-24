import { config as dotEnvConfig } from 'dotenv';

import { ApiVersions, NodeEnv } from '@app/constants';
import { getOsEnv, normalizePort, toNumber } from '@utils/util';

dotEnvConfig({ path: `.env.${getOsEnv('NODE_ENV')}` });

export const config = {
  APP_NAME: 'Node',
  NODE_ENV: getOsEnv('NODE_ENV'),
  PORT: normalizePort(getOsEnv('PORT')),
  isProduction: getOsEnv('NODE_ENV') === NodeEnv.PRODUCTION,
  isDevelopment: getOsEnv('NODE_ENV') === NodeEnv.DEVELOPMENT,
  BASE_URL: '/api/',
  V1_BASE_URL: `/api/${ApiVersions.V1}`,
  SWAGGER_URL: '/docs',
  V1_SWAGGER_URL: `/docs/${ApiVersions.V1}`,
  DB: {
    DB_HOST: getOsEnv('DB_HOST'),
    DB_PORT: toNumber(getOsEnv('DB_PORT')),
    DB_DIALECT: 'postgres',
    DB_DATABASE: getOsEnv('DB_DATABASE'),
    DB_USERNAME: getOsEnv('DB_USERNAME'),
    DB_PASSWORD: getOsEnv('DB_PASSWORD'),
  },
  JWT: {
    EXPIRES_IN: getOsEnv('JWT_EXPIRES_IN'),
    JWT_SECRET: getOsEnv('JWT_SECRET'),
  },
  HASH_SALT: toNumber(getOsEnv('HASH_SALT')),
  CRYPTO_ROUNDS: toNumber(getOsEnv('CRYPTO_ROUNDS')),
  CORS: {
    ORIGIN: '*',
    CREDENTIALS: true,
  },
  LOGS: {
    FORMAT: 'dev',
    DIR: '../../logs',
  },
  RATE_LIMIT: {
    MAX: 100,
    WINDOW__MS: 60 * 60 * 1000,
  },
};
