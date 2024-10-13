import { injectable, inject } from 'inversify';

import { TokenRequestDTO, ValidIdsDTO } from '@dtos/OAuthDTO';

import type { ITokenPrepareService } from '@application-interfaces/services/token/ITokenPrepareService';
import type { ITokenPreparationUseCase } from '@application-interfaces/usecases/ITokenUseCase';

@injectable()
class TokenPreparationUseCase implements ITokenPreparationUseCase {
  constructor(
    @inject('ITokenPrepareService')
    private tokenPrepareService: ITokenPrepareService,
  ) {}

  async execute(tokenRequest: TokenRequestDTO): Promise<ValidIdsDTO> {
    const ids = await this.tokenPrepareService.prepareToken(tokenRequest);

    return ids;
  }
}

export default TokenPreparationUseCase;
