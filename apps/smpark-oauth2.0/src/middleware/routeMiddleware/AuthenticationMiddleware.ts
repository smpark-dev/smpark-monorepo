import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';

import { COOKIE_NAMES } from '@constants/cookie';
import { ERROR_MESSAGES } from '@constants/errorMessages';
import { PATHS } from '@constants/path';
import { REISSUE_STATE } from '@constants/token';
import { CustomError } from '@domain/shared/errors/CustomError';

import type { ICookieHandler } from '@adapters/shared/handlers/ICookieHandler';
import type { ITokenReissueService } from '@domain/token/interfaces/services/ITokenReissueService';
import type { IAuthenticationMiddleware } from '@middleware/interfaces/routeMiddleware/IAuthenticationMiddleware';

@injectable()
class AuthenticationMiddleware implements IAuthenticationMiddleware {
  constructor(
    @inject('ITokenReissueService') private tokenReissueService: ITokenReissueService,
    @inject('ICookieHandler') private cookieHandler: ICookieHandler,
  ) {}

  handle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = req.cookies[COOKIE_NAMES.AUTH];

      if (!accessToken) {
        return this.handleUnauthenticatedUser(req, res, next);
      }

      return await this.handleTokenReissue(req, res, next, accessToken);
    } catch (error) {
      return next(error);
    }
  };

  private async handleTokenReissue(
    req: Request,
    res: Response,
    next: NextFunction,
    accessToken: string,
  ): Promise<void> {
    const reissueResult = await this.tokenReissueService.reissueToken(accessToken);
    switch (reissueResult.state) {
      case REISSUE_STATE.PASS:
        return this.handleTokenPass(req, next, reissueResult.data);

      case REISSUE_STATE.UPDATE:
        return this.handleTokenUpdate(req, res, next, reissueResult.data);

      case REISSUE_STATE.FAIL:
        return this.handleUnauthenticatedUser(req, res, next);
      default:
        throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }
  }

  private handleTokenPass(
    req: Request,
    next: NextFunction,
    data: { accessToken: string; userId: string } | null,
  ) {
    if (!data) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }

    req.userId = data.userId;
    return next();
  }

  private handleTokenUpdate(
    req: Request,
    res: Response,
    next: NextFunction,
    data: { accessToken: string; userId: string } | null,
  ): void {
    if (!data) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }

    this.cookieHandler.setCookie(res, {
      name: COOKIE_NAMES.AUTH,
      value: data.accessToken,
    });

    req.userId = data.userId;
    return next();
  }

  private handleUnauthenticatedUser(req: Request, res: Response, next: NextFunction): void {
    req.session.destroy((error) => {
      if (error) {
        return next(error);
      }

      this.clearAuthCookies(res);
      return this.redirectToLogin(req, res);
    });
  }

  private clearAuthCookies(res: Response): void {
    res.clearCookie(COOKIE_NAMES.AUTH);
    res.clearCookie(COOKIE_NAMES.SESSION);
  }

  private redirectToLogin(req: Request, res: Response): void {
    const isOAuthRequest = this.isOAuthRequest(req);

    if (isOAuthRequest) {
      return res.render(PATHS.OAUTH.LOGIN, req.query);
    }

    return res.redirect(PATHS.AUTH.LOGIN);
  }

  private isOAuthRequest(req: Request): boolean {
    return req.originalUrl.startsWith(PATHS.OAUTH.PREFIX) && Object.keys(req.query).length > 0;
  }
}

export default AuthenticationMiddleware;
