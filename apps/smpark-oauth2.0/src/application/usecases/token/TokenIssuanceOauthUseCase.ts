import { injectable, inject } from 'inversify';

import { ValidIdsDTO } from '@dtos/OAuthDTO';
import { TokenResponseDTO } from '@dtos/TokenDTO';

import type { ITokenIssuanceOAuthService } from '@application-interfaces/services/token/ITokenIssuanceOAuthService';
import type { ITokenIssuanceOauthUseCase } from '@application-interfaces/usecases/ITokenUseCase';

@injectable()
class TokenIssuanceOauthUseCase implements ITokenIssuanceOauthUseCase {
  constructor(
    @inject('ITokenIssuanceOAuthService')
    public tokenIssuanceOAuthService: ITokenIssuanceOAuthService,
  ) {}

  async execute(ids?: ValidIdsDTO | null): Promise<TokenResponseDTO> {
    const tokens = await this.tokenIssuanceOAuthService.issueOauthToken(ids);

    return tokens;
  }
}

export default TokenIssuanceOauthUseCase;
