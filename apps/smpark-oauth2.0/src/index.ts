import 'reflect-metadata';
import MongoStore from 'connect-mongo';
import express from 'express';

import env from '@infrastructure/configs/env';
import configureExpress from '@infrastructure/configs/express';
import { container, registerAllDependencies } from '@infrastructure/configs/inversify';
import configureSwagger from '@infrastructure/configs/swagger';
import MongoDB from '@infrastructure/database/MongoDB';
import Redis from '@infrastructure/database/Redis';

const { mongoDBName, redisURL } = env;
registerAllDependencies(env.mongoDBUri, mongoDBName, redisURL);

const database = container.get<MongoDB>(MongoDB);
await database.connect();
const sessionStore = new MongoStore({
  client: database.getClient(),
  dbName: mongoDBName,
  collectionName: env.mongoDBSessionCollection,
});

const redis = container.get<Redis>(Redis);
await redis.connect();

const app = express();

await configureExpress(app, sessionStore, env);
configureSwagger(app, env);

const port = env.port || 5555;
app.listen(port, async () => {
  console.log(`Oauth2.0 Server Connected, ${port} port!`);
});
