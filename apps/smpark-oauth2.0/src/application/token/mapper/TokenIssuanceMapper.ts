import BaseId from '@domain/shared/value-objects/BaseId';
import AuthToken from '@domain/token/value-objects/AuthToken';

import type { IUserLoginResponse } from '@application/user/interfaces/usecases/IUserLoginUseCase';

class TokenIssuanceMapper {
  static toOAuthTokens(token: {
    accessToken: AuthToken;
    refreshToken: AuthToken;
    expiresAt: number;
  }) {
    return {
      accessToken: token.accessToken.getValue(),
      refreshToken: token.refreshToken.getValue(),
      expiresAt: token.expiresAt,
    };
  }

  static toAuthTokens(
    token: { accessToken: AuthToken; refreshToken: AuthToken },
    userId: BaseId,
  ): IUserLoginResponse {
    return { accessToken: token.accessToken.getValue(), userId: userId.getValue() };
  }
}
export default TokenIssuanceMapper;
