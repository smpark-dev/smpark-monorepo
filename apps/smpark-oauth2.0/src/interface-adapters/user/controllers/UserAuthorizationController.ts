import { inject, injectable } from 'inversify';

import { UserAgreeScopeUpdaterRequestDTO } from '@adapters/user/dtos/UserAgreeScopeUpdaterRequestDTO';
import { CONSENT } from '@constants/consent';

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

      const { consent } = req.body;

      if (consent === CONSENT.DISAGREE) {
        if (req.session.address_uri) {
          return res.redirect(req.session.address_uri);
        }
      }

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
