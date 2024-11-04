import { inject, injectable } from 'inversify';

import { UserAgreeScopeUpdaterRequestDTO } from '@adapters/user/dtos/UserAgreeScopeUpdaterRequestDTO';

import type { IUserAuthorizationController } from '@adapters/user/interfaces/controllers/IUserAuthorizationController';
import type { IUserAgreedScopeUpdaterUseCase } from '@application/user/interfaces/usecases/IUserAgreedScopeUpdaterUseCase';
import type { Request, Response, NextFunction } from 'express';

@injectable()
class UserAuthorizationController implements IUserAuthorizationController {
  constructor(
    @inject('IUserAgreedScopeUpdaterUseCase')
    public userAgreedScopeUpdaterUseCase: IUserAgreedScopeUpdaterUseCase,
  ) {}

  updateUserAgreedScope = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const { scope: agreedScope, isUpdated } = req.session;
      console.log('req.session', req.session);
      const id = req.userId;
      const scopeRequestDTO = new UserAgreeScopeUpdaterRequestDTO({ agreedScope, isUpdated, id });
      await this.userAgreedScopeUpdaterUseCase.execute(scopeRequestDTO);

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default UserAuthorizationController;
