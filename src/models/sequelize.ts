import { config } from '@app/config';
import { LoggerService } from '@libs/logger';
import { Sequelize } from 'sequelize';

import { container } from 'tsyringe';

const logger: LoggerService = container.resolve(LoggerService);

const { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USERNAME } = config.DB;

export const sequelize: Sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  dialect: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  timezone: '+05:30',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: config.isDevelopment,
  logging: (query: string, time: number) => {
    if (config.isDevelopment) {
      logger.info(`${time}ms ${query}`);
    }
  },
  benchmark: true,
});

export default sequelize;
