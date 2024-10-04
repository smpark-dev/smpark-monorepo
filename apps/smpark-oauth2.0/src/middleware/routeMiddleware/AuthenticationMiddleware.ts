import { Response, NextFunction } from 'express';
import createError from 'http-errors';
import { inject, injectable } from 'inversify';
import { JwtPayload } from 'jsonwebtoken';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import User from '@entities/User';
import { IAuthenticationMiddleware } from '@middleware/interfaces/routeMiddleware/IAuthenticationMiddleware';

import type { IOauthRequest } from '@adapters-interfaces/express/IOauthRequest';
import type { IRedisTokenRepository } from '@domain-interfaces/repository/IRedisTokenRepository';
import type { ITokenService } from '@domain-interfaces/services/ITokenService';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class AuthenticationMiddleware implements IAuthenticationMiddleware {
  constructor(
    @inject('env') private env: EnvConfig,
    @inject('ITokenService') private tokenService: ITokenService,
    @inject('IRedisTokenRepository')
    private redisTokenRepository: IRedisTokenRepository,
  ) {}

  public handle = (req: IOauthRequest, res: Response, next: NextFunction): void => {
    const accessToken = req.cookies.auth_token;

    if (!accessToken) {
      return this.handleUnauthenticatedUser(req, res, next);
    }

    this.tokenVerifyAndChangedToken(accessToken, req, res, next);
  };

  private handleUnauthenticatedUser(req: IOauthRequest, res: Response, next: NextFunction): void {
    if (req.originalUrl.startsWith('/oauth') && Object.keys(req.query).length > 0) {
      req.session.unVerifiedRefererUri = req.headers.referer;
      res.render('oauth/login', req.query);
    } else {
      req.session.destroy((error) => {
        if (error) {
          next(error);
        }

        res.clearCookie('auth_token');
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
      const decoded = this.tokenService.verifyTokenIgnoreExpiration<User & JwtPayload>(
        accessToken,
        this.env.oauthAccessSecret,
      );

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const isExpired = decoded.exp ? decoded.exp < currentTimestamp : true;

      if (isExpired) {
        const refreshToken = await this.redisTokenRepository.find('refresh', decoded.id);

        if (refreshToken) {
          const decodedStrict = this.tokenService.verifyTokenStrict<User & JwtPayload>(
            refreshToken,
            this.env.oauthRefreshSecret,
          );

          if (decodedStrict) {
            const payload = {
              id: decoded.id,
              name: decoded.name,
              email: decoded.email,
            };

            const newAccessToken = this.tokenService.generateToken(
              payload,
              this.env.oauthAccessSecret,
              Number(this.env.oauthAccessTokenExpiresIn),
            );

            res.cookie('auth_token', newAccessToken, {
              maxAge: Number(this.env.oauthAccessTokenExpiresIn) * 1000,
              httpOnly: true,
              secure: true,
              sameSite: 'strict',
            });

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
