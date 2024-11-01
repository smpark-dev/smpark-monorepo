import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { COOKIE_NAMES } from '@constants/cookie';
import { PATHS } from '@constants/path';
import { REISSUE_STATE } from '@constants/token';

import type { ITokenReissueService } from '@domain/token/interfaces/services/ITokenReissueService';
import type { IAuthBlockMiddleware } from '@middleware/interfaces/routeMiddleware/IAuthBlockMiddleware';

@injectable()
class AuthBlockMiddleware implements IAuthBlockMiddleware {
  constructor(
    @inject('ITokenReissueService')
    private tokenReissueService: ITokenReissueService,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessToken = req.cookies[COOKIE_NAMES.AUTH];

    if (!accessToken) {
      return next();
    }

    try {
      const reissueResult = await this.tokenReissueService.reissueToken(accessToken);
      if (
        reissueResult.state === REISSUE_STATE.PASS ||
        reissueResult.state === REISSUE_STATE.UPDATE
      ) {
        return res.redirect(PATHS.OAUTH.REGISTER);
      }

      res.clearCookie(COOKIE_NAMES.AUTH);
      res.clearCookie(COOKIE_NAMES.SESSION);
      return next();
    } catch (error) {
      res.clearCookie(COOKIE_NAMES.AUTH);
      res.clearCookie(COOKIE_NAMES.SESSION);
      return next();
    }
  };
}

export default AuthBlockMiddleware;
