import { Response, NextFunction } from 'express';
import createError from 'http-errors';
import { inject, injectable } from 'inversify';
import { JwtPayload } from 'jsonwebtoken';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import User from '@entities/User';

import type { CookieOptions, ICookieHandler } from '@adapters-interfaces/handlers/ICookieHandler';
import type { IRedisTokenRepository } from '@domain-interfaces/infrastructure/repository/IRedisTokenRepository';
import type { ITokenManagementService } from '@domain-interfaces/infrastructure/services/ITokenManagementService';
import type { IOauthRequest } from '@infra-interfaces/IOauthRequest';
import type { EnvConfig } from '@lib/dotenv-env';
import type { IAuthenticationMiddleware } from '@middleware/interfaces/routeMiddleware/IAuthenticationMiddleware';

@injectable()
class AuthenticationMiddleware implements IAuthenticationMiddleware {
  constructor(
    @inject('env') private env: EnvConfig,
    @inject('IRedisTokenRepository')
    private redisTokenRepository: IRedisTokenRepository,
    @inject('ICookieHandler') private cookieHandler: ICookieHandler,
    @inject('ITokenManagementService') private tokenManagementService: ITokenManagementService,
  ) {}

  public handle = (req: IOauthRequest, res: Response, next: NextFunction): void => {
    const accessToken = req.cookies['smpark-auth'];

    if (!accessToken) {
      return this.handleUnauthenticatedUser(req, res, next);
    }

    this.tokenVerifyAndChangedToken(accessToken, req, res, next);
  };

  private handleUnauthenticatedUser(req: IOauthRequest, res: Response, next: NextFunction): void {
    if (req.originalUrl.startsWith('/oauth') && Object.keys(req.query).length > 0) {
      res.render('oauth/login', req.query);
    } else {
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

  private async tokenVerifyAndChangedToken(
    accessToken: string,
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const decoded = this.tokenManagementService.verifyTokenIgnoreExpiration<User & JwtPayload>(
        accessToken,
        this.env.oauthAccessSecret,
      );
      const currentTimestamp = Math.floor(Date.now() / 1000);
      const isExpired = decoded.exp ? decoded.exp < currentTimestamp : true;

      if (isExpired) {
        const refreshToken = await this.redisTokenRepository.find('refresh', decoded.id);

        if (refreshToken) {
          const decodedStrict = this.tokenManagementService.verifyTokenStrict<User & JwtPayload>(
            refreshToken,
            this.env.oauthRefreshSecret,
          );

          if (decodedStrict) {
            const payload = {
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
            };
            const newAccessToken = this.tokenManagementService.generateToken(
              payload,
              this.env.oauthAccessSecret,
              Number(this.env.oauthAccessTokenExpiresIn),
            );
            const cookieOptions: CookieOptions = {
              name: 'smpark-auth',
              value: newAccessToken,
              maxAge: Number(this.env.loginCookieExpiresIn) * 1000,
            };

            this.cookieHandler.setCookie(res, cookieOptions);

            req.session.user = payload;
          }
        } else {
          return this.handleUnauthenticatedUser(req, res, next);
        }
      } else {
        const user = {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
        };
        req.session.user = user;
      }

      next();
    } catch (error) {
      this.handleTokenVerificationError(error, res, next);
    }
  }

  private handleTokenVerificationError(error: unknown, res: Response, next: NextFunction): void {
    if (error instanceof Error) {
      switch (error.name) {
        case 'JsonWebTokenError':
          return next(createError(401, ERROR_MESSAGES.VALIDATION.FORMAT.TOKEN));
        case 'TokenExpiredError':
          return next(createError(401, ERROR_MESSAGES.VALIDATION.EXPIRED.TOKEN));
        default:
          return next(error);
      }
    }
    next(error);
  }
}

export default AuthenticationMiddleware;
