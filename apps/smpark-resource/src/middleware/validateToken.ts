import Koa from 'koa';

const validateToken = async (ctx: Koa.Context, next: Koa.Next) => {
  const authHeader = ctx.header?.authorization;
  if (!authHeader) {
    ctx.status = 401;
    ctx.body = { error: 'unauthorized', error_description: 'Authorization header is missing' };
    return;
  }

  const token = authHeader.split('Bearer ')[1] || authHeader.split('bearer ')[1];
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: 'invalid_token', error_description: 'Invalid token format' };
    return;
  }

  ctx.state.token = token;
  await next();
};

export default validateToken;
