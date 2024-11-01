import { injectable, inject } from 'inversify';

import type {
  ITokenPreparationUseCase,
  ITokenPrepareRequest,
} from '@application/token/interfaces/usecases/ITokenPreparationUseCase';
import type { IClientsCredentialsVerifierService } from '@domain/clients/interfaces/services/IClientsCredentialsVerifierService';
import type { ICodeValidationService } from '@domain/code/interfaces/services/ICodeValidationService';
import type { ITokenPreparationService } from '@domain/token/interfaces/services/ITokenPreparationService';

@injectable()
class TokenPreparationUseCase implements ITokenPreparationUseCase {
  constructor(
    @inject('ITokenPreparationService')
    private tokenPreparationService: ITokenPreparationService,
    @inject('IClientsCredentialsVerifierService')
    private clientsCredentialsVerifierService: IClientsCredentialsVerifierService,
    @inject('ICodeValidationService') private codeValidationService: ICodeValidationService,
  ) {}

  async execute(tokenRequest: ITokenPrepareRequest): Promise<string> {
    const { code, userId } = await this.codeValidationService.validateCode(tokenRequest.code);
    const clients = await this.clientsCredentialsVerifierService.validateClient(tokenRequest);

    this.tokenPreparationService.prepareToken(tokenRequest, code, clients);

    return userId.getValue();
  }
}

export default TokenPreparationUseCase;
