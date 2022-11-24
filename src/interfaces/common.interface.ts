import { Dialect } from 'sequelize';

export interface ISequelizeConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: Dialect;
  port: number;
}
