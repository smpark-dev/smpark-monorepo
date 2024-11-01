import { inject, injectable } from 'inversify';

import Clients from '@domain/clients/entities/Clients';
import User from '@domain/user/entities/User';

import type { IClientsDetailLoadService } from '@domain/clients/interfaces/services/IClientsDetailLoadService';
import type { IClientsRepository } from '@domain/clients/repository/IClientsRepository';

@injectable()
class ClientsDetailLoadService implements IClientsDetailLoadService {
  constructor(@inject('IClientsRepository') private clientsRepository: IClientsRepository) {}

  async loadClientDetail(id?: string): Promise<Clients | null> {
    const userId = User.validateUserId(id);
    return this.clientsRepository.findById(userId);
  }
}
export default ClientsDetailLoadService;
