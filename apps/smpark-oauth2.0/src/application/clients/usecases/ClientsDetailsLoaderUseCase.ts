import { injectable, inject } from 'inversify';

import { ClientsLoadMapper } from '@application/clients/mapper/ClientsLoadMapper';

import type {
  IClientsDetailsLoaderUseCase,
  IClientsLoadResponse,
} from '@application/clients/interfaces/usecases/IClientsDetailsLoaderUseCase';
import type { IClientsDetailLoadService } from '@domain/clients/interfaces/services/IClientsDetailLoadService';

@injectable()
class ClientsDetailsLoaderUseCase implements IClientsDetailsLoaderUseCase {
  constructor(
    @inject('IClientsDetailLoadService')
    private clientsDetailLoadService: IClientsDetailLoadService,
  ) {}

  async execute(id?: string): Promise<IClientsLoadResponse | null> {
    const clients = await this.clientsDetailLoadService.loadClientDetail(id);
    return clients ? ClientsLoadMapper.toClientLoad(clients) : null;
  }
}

export default ClientsDetailsLoaderUseCase;
