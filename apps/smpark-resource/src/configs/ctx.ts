import Koa from 'koa';
import serve from 'koa-static';
import path from 'path';
import { fileURLToPath } from 'url';

import cors from '@koa/cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configureCTX = async (app: Koa): Promise<void> => {
  app.use(
    cors({
      origin: (ctx) => {
        const validOrigins = [
          'http://localhost:3000',
          'https://smpark.dev',
          'https://staging.smpark.dev',
        ];
        const requestOrigin = ctx.get('Origin');

        if (validOrigins.includes(requestOrigin)) {
          return requestOrigin;
        }

        return validOrigins[0];
      },
      credentials: true,
      allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowHeaders: ['Content-Type', 'Authorization'],
    }),
  );
  app.use(serve(path.join(__dirname, '../../public')));

  const api = await import('../api/index');
  app.use(api.default.routes());
  app.use(api.default.allowedMethods());
};

export default configureCTX;
