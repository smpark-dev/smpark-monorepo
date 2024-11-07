import createError from 'http-errors';
import Koa from 'koa';
import Router from 'koa-router';

import env from '@configs/env';
import validateToken from '@middleware/validateToken';
import ClientsRepository from '@repository/UserRepository';
import { getImages } from '@services/getImages';

const client = new ClientsRepository();
const services = new Router();

services.get('/image', validateToken, async (ctx: Koa.Context) => {
  try {
    const key = env.oauthAccessSecretKey;
    const imageResult = await getImages(ctx.state.token, key, client);
    ctx.status = 200;
    ctx.body = imageResult;
  } catch (error) {
    if (createError.isHttpError(error)) {
      ctx.status = error.status;
      ctx.body = {
        error: 'invalid_request',
        error_description: error.message,
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: 'server_error',
        error_description: 'Internal server error',
      };
    }
  }
});

export default services;
