import { config } from '@app/config';
import { ApiVersions } from '@app/constants';
import { Router } from 'express';
import { indexRouter } from './index.route';

const v1Router: Router = Router();

v1Router.use(`${config.BASE_URL}${ApiVersions.V1}`, indexRouter);

export { v1Router };
