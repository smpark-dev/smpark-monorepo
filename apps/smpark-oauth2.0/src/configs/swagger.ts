import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const configureSwagger = (app: express.Application): void => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const options: swaggerJsdoc.Options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'smpark oauth2.0 API',
        version: '1.0.0',
      },
      servers: [
        {
          url: process.env.API_URL || 'http://localhost:4000',
          description: 'smpark oauth2.0 API server',
        },
      ],
    },
    apis: [path.join(__dirname, '../routes/*.ts'), path.join(__dirname, '../domain/entities/*.ts')],
  };

  const specs = swaggerJsdoc(options);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default configureSwagger;
