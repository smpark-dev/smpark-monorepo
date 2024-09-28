import Koa from 'koa';

import configureCTX from '@configs/ctx';
import env from '@configs/env';
import MongoDB from '@configs/MongoDB';

const port = env.port ? Number(env.port) : 6000;

const mongo = MongoDB.getInstance(env.mongoDBUri, env.mongoDBName);
await mongo.connect();

const app = new Koa();

configureCTX(app);

app.listen(port, () => {
  console.log(`Resource Server Connected, ${port} port!`);
});
