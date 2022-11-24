import { config } from '@app/config';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  swagger: '2.0',
  info: {
    title: 'REST API',
    version: '1.0.0',
    description: 'Example docs',
  },
  host: `localhost:${config.PORT}`,
  basePath: config.V1_BASE_URL,
  tags: [
    {
      name: 'Health',
      description: '',
    },
    {
      name: 'Auth',
      description: 'API for auth',
    },
    {
      name: 'Users',
      description: 'API for users',
    },
  ],
  schemes: ['http', 'https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
    },
  },
  consumes: ['application/json'],
  produces: ['application/json'],
};

const options = {
  swaggerDefinition,
  apis: ['**/*.ts'],
};

export const swaggerSpecsV1: object = swaggerJSDoc(options);
