import { injectable, inject } from 'inversify';

import { ClientsAuthorizationMapper } from '@application/clients/mapper/ClientsAuthorizationMapper';

import type {
  IAuthorizeRequest,
  IClientsAuthorizationVerifierUseCase,
} from '@application/clients/interfaces/usecases/IClientsAuthorizationVerifierUseCase';
import type { IClientsAuthorizationValidationService } from '@domain/clients/interfaces/services/IClientsAuthorizationValidationService';

@injectable()
class ClientsAuthorizationVerifierUseCase implements IClientsAuthorizationVerifierUseCase {
  constructor(
    @inject('IClientsAuthorizationValidationService')
    private authorizationValidationService: IClientsAuthorizationValidationService,
  ) {}

  async execute(authorizeRequest: IAuthorizeRequest): Promise<string> {
    const clients = await this.authorizationValidationService.validateAuthorize(authorizeRequest);

    return ClientsAuthorizationMapper.toClientAuthorize(clients);
  }
}

export default ClientsAuthorizationVerifierUseCase;
