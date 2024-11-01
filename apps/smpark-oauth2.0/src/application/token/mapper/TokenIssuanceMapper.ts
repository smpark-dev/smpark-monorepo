import BaseId from '@domain/shared/value-objects/BaseId';
import AuthToken from '@domain/token/value-objects/AuthToken';

import type { IUserLoginResponse } from '@application/user/interfaces/usecases/IUserLoginUseCase';

class TokenIssuanceMapper {
  static toOAuthTokens(token: { accessToken: AuthToken; refreshToken: AuthToken }) {
    return {
      accessToken: token.accessToken.getValue(),
      refreshToken: token.refreshToken.getValue(),
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
