import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

import type { IEnvService } from '@domain/shared/interfaces/services/IEnvService';
import type { IJsonWebTokenService } from '@domain/shared/interfaces/services/IJsonWebTokenService';
import type { IScope } from '@domain/shared/value-objects/BaseScope';

export type TokenType = 'ACCESS' | 'REFRESH';

export interface ITokenPayload {
  sub: string;
  iss?: string;
  name?: string;
  aud?: string;
  scope?: IScope;
}
export interface ITokenOptions {
  accessToken: {
    jwtSecretKey: string;
    expiresIn: number;
  };
  refreshToken: {
    jwtSecretKey: string;
    expiresIn: number;
  };
}

class AuthToken {
  #token: string;

  constructor(token: string | undefined | null) {
    this.#token = token?.trim() || '';
  }

  static validate(token: string | undefined | null): AuthToken {
    if (!token || token.trim() === '') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.TOKEN);
    }

    return new AuthToken(token);
  }

  static create(
    payload: ITokenPayload,
    options: ITokenOptions,
    envService: IEnvService,
    tokenGenerator: IJsonWebTokenService,
  ) {
    return {
      accessToken: new AuthToken(
        tokenGenerator.generateToken(
          payload,
          options.accessToken.jwtSecretKey,
          options.accessToken.expiresIn,
        ),
      ),
      refreshToken: new AuthToken(
        tokenGenerator.generateToken(
          payload,
          options.refreshToken.jwtSecretKey,
          options.refreshToken.expiresIn,
        ),
      ),
      expiresAt: Date.now() + Number(envService.getOAuthAccessTokenExpiresIn()) * 1000,
    };
  }

  static createOptions(envService: IEnvService): ITokenOptions {
    return {
      accessToken: {
        jwtSecretKey: envService.getOAuthAccessSecret(),
        expiresIn: Number(envService.getOAuthAccessTokenExpiresIn()),
      },
      refreshToken: {
        jwtSecretKey: envService.getOAuthRefreshSecret(),
        expiresIn: Number(envService.getOAuthRefreshTokenExpiresIn()),
      },
    };
  }

  getValue(): string {
    return this.#token;
  }
}

export default AuthToken;
