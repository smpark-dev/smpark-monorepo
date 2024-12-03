import { IEnvService } from '@domain/shared/interfaces/services/IEnvService';
import BaseScope, { IScope } from '@domain/shared/value-objects/BaseScope';
import AuthToken, { ITokenOptions, ITokenPayload } from '@domain/token/value-objects/AuthToken';
import TokenId from '@domain/token/value-objects/TokenId';

import type { IJsonWebTokenService } from '@domain/shared/interfaces/services/IJsonWebTokenService';

class Token {
  #tokenId: TokenId;
  #accessToken: AuthToken;
  #refreshToken: AuthToken;
  #tokenGrantedScopes: BaseScope;

  constructor(
    tokenId: TokenId,
    accessToken: AuthToken,
    refreshToken: AuthToken,
    tokenGrantedScopes: BaseScope,
  ) {
    this.#tokenId = tokenId;
    this.#accessToken = accessToken;
    this.#refreshToken = refreshToken;
    this.#tokenGrantedScopes = tokenGrantedScopes;
  }

  static create(token: {
    tokenId: string;
    accessToken: string;
    refreshToken: string;
    tokenGrantedScopes: IScope;
  }): Token {
    return new Token(
      TokenId.validate(token.tokenId),
      AuthToken.validate(token.accessToken),
      AuthToken.validate(token.refreshToken),
      BaseScope.validate(token.tokenGrantedScopes),
    );
  }

  get tokenId(): TokenId {
    return this.#tokenId;
  }

  get accessToken(): AuthToken {
    return this.#accessToken;
  }

  get refreshToken(): AuthToken {
    return this.#refreshToken;
  }

  get tokenGrantedScopes(): BaseScope {
    return this.#tokenGrantedScopes;
  }

  static createOptions(envService: IEnvService): ITokenOptions {
    return AuthToken.createOptions(envService);
  }

  static generateToken(
    payload: ITokenPayload,
    options: ITokenOptions,
    envService: IEnvService,
    tokenGenerator: IJsonWebTokenService,
  ): { accessToken: AuthToken; refreshToken: AuthToken; expiresAt: number } {
    return AuthToken.create(payload, options, envService, tokenGenerator);
  }

  static validateToken(token?: string | null): AuthToken {
    return AuthToken.validate(token);
  }
}

export default Token;
