import AuthToken from '@domain/token/value-objects/AuthToken';

export interface ITokens {
  accessToken: AuthToken;
  refreshToken: AuthToken;
}

export interface ITokenOAuthIssuanceService {
  issueOAuthToken(userId?: string, clientId?: string): Promise<ITokens>;
}
