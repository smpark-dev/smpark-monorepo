import Koa from 'koa';

import cors from '@koa/cors';

const configureCTX = async (app: Koa): Promise<void> => {
  app.use(cors());

  const api = await import('../api/index');
  app.use(api.default.routes());
  app.use(api.default.allowedMethods());
};

export default configureCTX;
