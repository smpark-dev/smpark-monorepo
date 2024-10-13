import { TokenRequestDTO } from '@dtos/OAuthDTO';

export interface ITokenPrepareService {
  prepareToken(tokenRequest: TokenRequestDTO): Promise<{ id: string; client_id: string }>;
}
