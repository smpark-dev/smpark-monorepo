import { TokenRequestDTO, ValidIdsDTO } from '@dtos/OAuthDTO';
import { TokenResponseDTO } from '@dtos/TokenDTO';

export interface ITokenIssuanceOauthUseCase {
  execute(ids?: ValidIdsDTO | null): Promise<TokenResponseDTO>;
}

export interface ITokenPreparationUseCase {
  execute(tokenRequest: TokenRequestDTO): Promise<ValidIdsDTO>;
}
