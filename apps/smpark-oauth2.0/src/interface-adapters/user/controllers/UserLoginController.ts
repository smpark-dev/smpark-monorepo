import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import { UserLoginRequestDTO } from '@adapters/user/dtos/UserLoginRequestDTO';
import { authSerialize } from '@utils/serialize';

import type { ICookieHandler } from '@adapters/shared/handlers/ICookieHandler';
import type { IUserLoginController } from '@adapters/user/interfaces/controllers/IUserLoginController';
import type { IUserLoginUseCase } from '@application/user/interfaces/usecases/IUserLoginUseCase';

@injectable()
class LoginController implements IUserLoginController {
  constructor(
    @inject('ICookieHandler') private cookieHandler: ICookieHandler,
    @inject('IUserLoginUseCase') private userLoginUseCase: IUserLoginUseCase,
  ) {}

  renderLoginPage = (req: Request, res: Response): void => {
    if (req.userId) {
      res.redirect('/oauth/register');
    } else {
      res.render('auth/login');
    }
  };

  userLogin = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const loginRequest = new UserLoginRequestDTO(req.body);
      const { accessToken, userId } = await this.userLoginUseCase.execute(loginRequest);

      this.cookieHandler.setCookie(res, {
        name: 'smpark-auth',
        value: accessToken,
      });

      req.body = authSerialize(req.body, ['password']);

      req.userId = userId;

      return res.status(200).send({ message: '로그인 성공', redirect: '/oauth/register' });
    } catch (error) {
      return next(error);
    }
  };

  authorizeUserLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    const { id, password, client_id, redirect_uri, state, scope, response_type } = req.body;

    try {
      const loginRequest = new UserLoginRequestDTO({ id, password, client_id, redirect_uri });
      const { accessToken, userId } = await this.userLoginUseCase.execute(loginRequest);

      this.cookieHandler.setCookie(res, {
        name: 'smpark-auth',
        value: accessToken,
      });

      req.body = authSerialize(req.body, ['password']);

      req.userId = userId;

      return res.status(200).send({
        message: '로그인 성공',
        redirect: `/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&response_type=${response_type}`,
      });
    } catch (error) {
      return next(error);
    }
  };
}

export default LoginController;
