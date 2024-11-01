import AuthToken from '@domain/token/value-objects/AuthToken';
import User from '@domain/user/entities/User';

export interface ITokenAuthIssuanceService {
  issueAuthToken(user: User): Promise<{
    accessToken: AuthToken;
    refreshToken: AuthToken;
  }>;
}
