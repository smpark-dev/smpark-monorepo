import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

import type { EnvConfig } from '@dotenv/env';

const configureSwagger = (app: express.Application, env: EnvConfig): void => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const swaggerPath =
    env.nodeEnv === 'production'
      ? '/usr/src/oauth/swagger.yaml'
      : path.join(__dirname, '../../../swagger.yaml');

  const swaggerDocument = YAML.load(swaggerPath);

  swaggerDocument.servers = [
    {
      url: env.issuer || 'http://localhost:4000',
      description: 'smpark oauth2.0 API server',
    },
  ];

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default configureSwagger;
