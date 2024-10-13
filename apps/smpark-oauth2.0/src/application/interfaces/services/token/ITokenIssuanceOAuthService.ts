import { ValidIdsDTO } from '@dtos/OAuthDTO';
import { TokenResponseDTO } from '@dtos/TokenDTO';

export interface ITokenIssuanceOAuthService {
  issueOauthToken(ids?: ValidIdsDTO | null): Promise<TokenResponseDTO>;
}
