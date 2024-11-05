import { Router } from 'express';

import { container } from '@infrastructure/configs/inversify';
import dynamicCSPMiddleware from '@middleware/routeMiddleware/dynamicCSPMiddleware';

import type { IClientsCredentialsController } from '@adapters/clients/interfaces/controllers/IClientsCredentialsController';
import type { IClientsRegistrationController } from '@adapters/clients/interfaces/controllers/IClientsRegistrationController';
import type { IClientsVerifierController } from '@adapters/clients/interfaces/controllers/IClientsVerifierController';
import type { ICodeGenerationController } from '@adapters/code/interfaces/ICodeGenerationController';
import type { ITokenGenerationController } from '@adapters/token/interfaces/ITokenGenerationController';
import type { IUserAuthorizationController } from '@adapters/user/interfaces/controllers/IUserAuthorizationController';
import type { IUserLoginController } from '@adapters/user/interfaces/controllers/IUserLoginController';
import type { IAuthenticationMiddleware } from '@middleware/interfaces/routeMiddleware/IAuthenticationMiddleware';

const clientsCredentialsController = container.get<IClientsCredentialsController>(
  'IClientsCredentialsController',
);
const clientsRegistrationController = container.get<IClientsRegistrationController>(
  'IClientsRegistrationController',
);
const clientsVerifierController = container.get<IClientsVerifierController>(
  'IClientsVerifierController',
);
const authenticationMiddleware = container.get<IAuthenticationMiddleware>(
  'IAuthenticationMiddleware',
);
const userLoginController = container.get<IUserLoginController>('IUserLoginController');
const userAuthorizationController = container.get<IUserAuthorizationController>(
  'IUserAuthorizationController',
);
const codeGenerationController = container.get<ICodeGenerationController>(
  'ICodeGenerationController',
);
const tokenGenerationController = container.get<ITokenGenerationController>(
  'ITokenGenerationController',
);

const oauth = Router();

oauth.get(
  '/register',
  authenticationMiddleware.handle,
  clientsRegistrationController.renderClientRegisterPage,
);

oauth.put(
  '/register',
  authenticationMiddleware.handle,
  clientsRegistrationController.registerClientsDetail,
);

oauth.patch(
  '/credential',
  authenticationMiddleware.handle,
  clientsCredentialsController.generateCredentials,
);

oauth.get(
  '/authorize',
  authenticationMiddleware.handle,
  clientsVerifierController.verifyOauthRequest,
  dynamicCSPMiddleware,
  clientsVerifierController.compareScope,
);

oauth.post(
  '/authorize',
  clientsVerifierController.verifyOauthRequest,
  userLoginController.authorizeUserLogin.bind(userLoginController),
);

oauth.post(
  '/consent',
  authenticationMiddleware.handle,
  userAuthorizationController.updateUserAgreedScope,
  codeGenerationController.generateCode,
);

oauth.post(
  '/token',
  tokenGenerationController.verifyTokenRequest,
  tokenGenerationController.generateAccessToken,
);

export default oauth;
