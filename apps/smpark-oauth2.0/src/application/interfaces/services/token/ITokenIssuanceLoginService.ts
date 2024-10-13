import User from '@entities/User';

export interface ITokenIssuanceLoginService {
  issueLoginTokens(user: User, id: string): Promise<string>;
}
