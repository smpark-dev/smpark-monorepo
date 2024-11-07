import Router from 'koa-router';

import auth from './auth/index.js';
import services from './services/index.js';

const api = new Router();

api.use('/auth', auth.routes());
api.use('/service', services.routes());

export default api;
