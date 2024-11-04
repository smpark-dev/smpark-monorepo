import { Router } from 'express';

import { container } from '@infrastructure/configs/inversify';

import type { IUserLoginController } from '@adapters/user/interfaces/controllers/IUserLoginController';
import type { IUserLogoutController } from '@adapters/user/interfaces/controllers/IUserLogoutController';
import type { IUserRegistrationController } from '@adapters/user/interfaces/controllers/IUserRegistrationController';
import type { IAuthBlockMiddleware } from '@middleware/interfaces/routeMiddleware/IAuthBlockMiddleware';

const loginController = container.get<IUserLoginController>('IUserLoginController');
const logoutController = container.get<IUserLogoutController>('IUserLogoutController');
const registrationController = container.get<IUserRegistrationController>(
  'IUserRegistrationController',
);
const authBlockMiddleware = container.get<IAuthBlockMiddleware>('IAuthBlockMiddleware');

const auth = Router();

auth.get('/register', authBlockMiddleware.handle, registrationController.renderRegisterPage);

auth.post('/register', authBlockMiddleware.handle, registrationController.userRegister);

auth.get('/login', authBlockMiddleware.handle, loginController.renderLoginPage);

auth.post('/login', authBlockMiddleware.handle, loginController.userLogin);

auth.post('/logout', logoutController.userLogout);

export default auth;
