import { Router } from 'express';

import { container } from '@configs/inversify';
import dynamicCSPMiddleware from '@middleware/routeMiddleware/dynamicCSPMiddleware';

import type { IClientsController } from '@adapters-interfaces/controllers/IClientsController';
import type { IOAuthController } from '@adapters-interfaces/controllers/IOAuthController';
import type { IAuthenticationMiddleware } from '@middleware/interfaces/routeMiddleware/IAuthenticationMiddleware';

const oAuthController = container.get<IOAuthController>('IOAuthController');
const clientsController = container.get<IClientsController>('IClientsController');
const authenticationMiddleware = container.get<IAuthenticationMiddleware>(
  'IAuthenticationMiddleware',
);

const oauth = Router();

oauth.get(
  '/register',
  authenticationMiddleware.handle,
  clientsController.renderClientRegistrationPage.bind(clientsController),
);

oauth.post(
  '/register',
  authenticationMiddleware.handle,
  clientsController.registerClientsDetail.bind(clientsController),
);

oauth.post(
  '/credential',
  authenticationMiddleware.handle,
  clientsController.generateCredentials.bind(clientsController),
);

oauth.get(
  '/authorize',
  authenticationMiddleware.handle,
  oAuthController.verifyOauthRequest.bind(oAuthController),
  dynamicCSPMiddleware,
  oAuthController.compareScope.bind(oAuthController),
);

oauth.post(
  '/authorize',
  oAuthController.verifyOauthRequest.bind(oAuthController),
  oAuthController.oAuthUserLogin.bind(oAuthController),
);

oauth.get(
  '/consent',
  authenticationMiddleware.handle,
  oAuthController.updateUserAgreedScope.bind(oAuthController),
  oAuthController.generateCode.bind(oAuthController),
);

oauth.post('/disagree', oAuthController.disagree.bind(oAuthController));

oauth.post(
  '/token',
  oAuthController.verifyTokenRequest.bind(oAuthController),
  oAuthController.generateAccessToken.bind(oAuthController),
);

export default oauth;
