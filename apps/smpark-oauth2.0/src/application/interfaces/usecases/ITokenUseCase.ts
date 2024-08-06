import { ValidIdsDTO } from '@dtos/OAuthDTO';
import { TokenResponseDTO } from '@dtos/TokenDTO';

export interface ITokenGenerationUseCase {
  execute(ids?: ValidIdsDTO | null): Promise<TokenResponseDTO>;
}
