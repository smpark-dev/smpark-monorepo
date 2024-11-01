import { injectable, inject } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Clients from '@domain/clients/entities/Clients';
import ClientSecret from '@domain/clients/value-objects/ClientSecret';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';

import type {
  IClientsCredentialsVerifierService,
  ICredential,
} from '@domain/clients/interfaces/services/IClientsCredentialsVerifierService';
import type { IClientsRepository } from '@domain/clients/repository/IClientsRepository';

@injectable()
class ClientsCredentialsVerifierService implements IClientsCredentialsVerifierService {
  constructor(@inject('IClientsRepository') private clientsRepository: IClientsRepository) {}

  async validateClient(credentialRequest: ICredential): Promise<Clients> {
    const credential = Clients.validateCredential(credentialRequest);
    const clients = await this.fetchCredential(credential);

    return clients;
  }

  private async fetchCredential(validatedCredential: {
    clientId: BaseClientId;
    clientSecret: ClientSecret;
  }): Promise<Clients> {
    const credential = await this.clientsRepository.findByClients(validatedCredential);

    if (!credential) {
      throw new CustomError(401, ERROR_MESSAGES.NOT_FOUND.CREDENTIAL);
    }

    return credential;
  }
}
export default ClientsCredentialsVerifierService;
