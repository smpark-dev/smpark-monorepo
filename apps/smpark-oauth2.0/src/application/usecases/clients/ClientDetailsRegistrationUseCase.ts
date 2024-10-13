import { injectable, inject } from 'inversify';

import { ClientsRequestDTO } from '@dtos/ClientsDTO';

import type { IClientsRegisterService } from '@application-interfaces/services/clients/IClientsRegisterService';
import type { IClientDetailsRegistrationUseCase } from '@application-interfaces/usecases/IClientsUseCase';

@injectable()
class ClientDetailsRegistrationUseCase implements IClientDetailsRegistrationUseCase {
  constructor(
    @inject('IClientsRegisterService') private clientsRegisterService: IClientsRegisterService,
  ) {}

  async execute(clientsData: ClientsRequestDTO): Promise<void> {
    await this.clientsRegisterService.registerClient(clientsData);
  }
}

export default ClientDetailsRegistrationUseCase;
