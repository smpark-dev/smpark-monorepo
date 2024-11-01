import { injectable, inject } from 'inversify';

import type {
  IClientsDetailsRegistrationUseCase,
  IClientsDetailsRequest,
} from '@application/clients/interfaces/usecases/IClientsDetailsRegistrationUseCase';
import type { IClientsDetailRegistrationService } from '@domain/clients/interfaces/services/IClientsDetailRegistrationService';

@injectable()
class ClientsDetailsRegistrationUseCase implements IClientsDetailsRegistrationUseCase {
  constructor(
    @inject('IClientsDetailRegistrationService')
    private clientsDetailRegistrationService: IClientsDetailRegistrationService,
  ) {}

  async execute(clientsDetailsRequest: IClientsDetailsRequest): Promise<void> {
    await this.clientsDetailRegistrationService.registerClientDetail(clientsDetailsRequest);
  }
}

export default ClientsDetailsRegistrationUseCase;
