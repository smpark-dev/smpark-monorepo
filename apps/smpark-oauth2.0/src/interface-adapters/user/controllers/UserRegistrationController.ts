import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import { UserRegisterRequestDTO } from '@adapters/user/dtos/UserRegisterRequestDTO';
import { authSerialize } from '@utils/serialize';

import type { IUserRegistrationController } from '@adapters/user/interfaces/controllers/IUserRegistrationController';
import type { IUserRegistrationUseCase } from '@application/user/interfaces/usecases/IUserRegistrationUseCase';

@injectable()
class UserRegistrationController implements IUserRegistrationController {
  constructor(
    @inject('IUserRegistrationUseCase')
    private userRegistrationUseCase: IUserRegistrationUseCase,
  ) {}

  renderRegisterPage = (req: Request, res: Response): void => {
    if (req.userId) {
      res.redirect('/oauth/register');
    } else {
      res.render('auth/register');
    }
  };

  userRegister = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const registerInfo = new UserRegisterRequestDTO(req.body);
      await this.userRegistrationUseCase.execute(registerInfo);

      req.body = authSerialize(req.body, ['password']);

      return res.status(200).send({ message: '회원가입 성공', redirect: '/login' });
    } catch (error) {
      return next(error);
    }
  };
}

export default UserRegistrationController;
