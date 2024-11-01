import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Clients from '@domain/clients/entities/Clients';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';
import User from '@domain/user/entities/User';

import type { IClientsDetails } from '@domain/clients/interfaces/services/IClientsDetailRegistrationService';
import type { IClientsRepository } from '@domain/clients/repository/IClientsRepository';

@injectable()
class ClientsDetailRegistrationService {
  constructor(@inject('IClientsRepository') private clientsRepository: IClientsRepository) {}

  async registerClientDetail(clientsDetails: IClientsDetails): Promise<void> {
    const userId = User.validateUserId(clientsDetails.id);
    const clients = Clients.create(clientsDetails);

    await this.saveClientDetail(userId, clients);
  }

  private async saveClientDetail(userId: BaseId, clients: Clients) {
    const isSaved = await this.clientsRepository.save(clients, userId);

    if (!isSaved) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }
  }
}
export default ClientsDetailRegistrationService;
