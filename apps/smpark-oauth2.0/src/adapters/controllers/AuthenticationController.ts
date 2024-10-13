import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import UserMapper from '@mapper/UserMapper';
import { authSerialize } from '@utils/serialize';

import type { IAuthenticationController } from '@adapters-interfaces/controllers/IAuthenticationController';
import type { CookieOptions, ICookieHandler } from '@adapters-interfaces/handlers/ICookieHandler';
import type {
  IUserLoginUseCase,
  IUserRegistrationUseCase,
} from '@application-interfaces/usecases/IAuthUseCase';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class AuthenticationController implements IAuthenticationController {
  constructor(
    @inject('env') private env: EnvConfig,
    @inject(UserMapper) private userMapper: UserMapper,
    @inject('IUserLoginUseCase') private userLoginUseCase: IUserLoginUseCase,
    @inject('IUserRegistrationUseCase')
    private userRegistrationUseCase: IUserRegistrationUseCase,
    @inject('ICookieHandler') private cookieHandler: ICookieHandler,
  ) {}

  renderLoginPage(req: Request, res: Response): void {
    if (req.session.user) {
      res.redirect('/oauth/register');
    } else {
      res.render('auth/login');
    }
  }

  renderRegisterPage(req: Request, res: Response): void {
    if (req.session.user) {
      res.redirect('/oauth/register');
    } else {
      res.render('auth/register');
    }
  }

  async userLogin(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    const { id, password } = req.body;

    try {
      const loginDTO = this.userMapper.toLoginDTO(id, password);
      const accessToken = await this.userLoginUseCase.execute(loginDTO);
      const cookieOptions: CookieOptions = {
        name: 'smpark-auth',
        value: accessToken,
        maxAge: Number(this.env.loginCookieExpiresIn) * 1000,
      };

      this.cookieHandler.setCookie(res, cookieOptions);

      req.body = authSerialize(req.body, ['password']);

      return res.status(200).send({ message: '로그인 성공', redirect: '/oauth/register' });
    } catch (error) {
      return next(error);
    }
  }

  async userRegister(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    const userRegisterInfo = req.body;

    try {
      const registerDTO = this.userMapper.toRegisterDTO(userRegisterInfo);
      await this.userRegistrationUseCase.execute(registerDTO);

      req.body = authSerialize(req.body, ['password']);

      return res.status(200).send({ message: '회원가입 성공', redirect: '/login' });
    } catch (error) {
      return next(error);
    }
  }

  userLogout(req: Request, res: Response, next: NextFunction): void {
    req.session.destroy((error) => {
      if (error) {
        next(error);
      }

      res.clearCookie('smpark-auth');
      res.clearCookie('connect.sid');

      return res.redirect('/');
    });
  }
}

export default AuthenticationController;
