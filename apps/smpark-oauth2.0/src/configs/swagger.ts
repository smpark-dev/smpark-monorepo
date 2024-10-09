import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const configureSwagger = (app: express.Application): void => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // YAML 파일 로드
  const swaggerDocument = YAML.load(path.join(__dirname, '../../swagger.yaml'));

  // 서버 정보 동적 추가
  swaggerDocument.servers = [
    {
      url: process.env.API_URL || 'http://localhost:4000',
      description: 'smpark oauth2.0 API server',
    },
  ];

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default configureSwagger;
