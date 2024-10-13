import { injectable, inject } from 'inversify';

import { ClientsDTO } from '@dtos/ClientsDTO';

import type { IClientsLoadService } from '@application-interfaces/services/clients/IClientsLoadService';
import type { IClientDetailsLoaderUseCase } from '@application-interfaces/usecases/IClientsUseCase';

@injectable()
class ClientDetailsLoaderUseCase implements IClientDetailsLoaderUseCase {
  constructor(@inject('IClientsLoadService') private clientsLoadService: IClientsLoadService) {}

  async execute(id?: string): Promise<ClientsDTO | null> {
    const clients = await this.clientsLoadService.loadClient(id);

    return clients;
  }
}

export default ClientDetailsLoaderUseCase;
