import { injectable, inject } from 'inversify';

import TokenIssuanceMapper from '@application/token/mapper/TokenIssuanceMapper';

import type {
  ICredentialRequest,
  ITokenOAuthIssuanceUseCase,
  ITokenResponse,
} from '@application/token/interfaces/usecases/ITokenOAuthIssuanceUseCase';
import type { ICodeDeletionService } from '@domain/code/interfaces/services/ICodeDeletionService';
import type { ITokenOAuthIssuanceService } from '@domain/token/interfaces/services/ITokenOAuthIssuanceService';

@injectable()
class TokenOAuthIssuanceUseCase implements ITokenOAuthIssuanceUseCase {
  constructor(
    @inject('ITokenOAuthIssuanceService')
    public tokenOAuthIssuanceService: ITokenOAuthIssuanceService,
    @inject('ICodeDeletionService')
    public codeDeletionService: ICodeDeletionService,
  ) {}

  async execute(ids?: ICredentialRequest): Promise<ITokenResponse> {
    const tokens = await this.tokenOAuthIssuanceService.issueOAuthToken(ids?.id, ids?.client_id);
    await this.codeDeletionService.deleteCode(ids?.id);

    return TokenIssuanceMapper.toOAuthTokens(tokens);
  }
}

export default TokenOAuthIssuanceUseCase;
