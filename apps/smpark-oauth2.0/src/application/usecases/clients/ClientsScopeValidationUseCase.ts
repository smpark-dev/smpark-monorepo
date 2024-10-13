import { injectable, inject } from 'inversify';

import { ScopeRequestDTO } from '@dtos/OAuthDTO';
import { ScopeDTO } from '@dtos/TokenDTO';

import type { IClientsScopeValidationService } from '@application-interfaces/services/clients/IClientsScopeValidationService';
import type { IClientsScopeValidationUseCase } from '@application-interfaces/usecases/IClientsUseCase';

@injectable()
class ClientsScopeValidationUseCase implements IClientsScopeValidationUseCase {
  constructor(
    @inject('IClientsScopeValidationService')
    private clientsScopeValidationService: IClientsScopeValidationService,
  ) {}

  async execute(
    requestScope: ScopeRequestDTO,
  ): Promise<{ scope: Partial<ScopeDTO>; updated: boolean }> {
    const validatedScope = await this.clientsScopeValidationService.validateScope(requestScope);

    return validatedScope;
  }
}

export default ClientsScopeValidationUseCase;
