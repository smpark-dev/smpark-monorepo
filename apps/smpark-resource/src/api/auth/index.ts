import Koa from 'koa';
import Router from 'koa-router';

import env from '@configs/env';
import validateToken from '@middleware/validateToken';
import ClientsRepository from '@repository/UserRepository';
import { getScope } from '@services/getScope';

const client = new ClientsRepository();
const auth = new Router();

auth.get('/scope', validateToken, async (ctx: Koa.Context) => {
  try {
    const key = env.oauthAccessSecretKey;
    const scopeResult = await getScope(ctx.state.token, key, client);
    ctx.status = 200;
    ctx.body = scopeResult;
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: 'invalid_request',
      error_description: 'Failed to retrieve scope information',
    };
  }
});

export default auth;
