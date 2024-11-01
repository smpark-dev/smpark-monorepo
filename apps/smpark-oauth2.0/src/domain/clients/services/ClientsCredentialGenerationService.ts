import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Clients from '@domain/clients/entities/Clients';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';

import type {
  IClientsCredentialGenerationService,
  ICredentialResponse,
} from '@domain/clients/interfaces/services/IClientsCredentialGenerationService';
import type {
  IClientsCredentialValidationService,
  ICredentialRequest,
} from '@domain/clients/interfaces/services/IClientsCredentialValidationService';
import type { IClientsRepository } from '@domain/clients/repository/IClientsRepository';
import type { IUUIDv4Service } from '@domain/shared/interfaces/services/IUUIDv4Service';

@injectable()
class ClientsCredentialGenerationService implements IClientsCredentialGenerationService {
  constructor(
    @inject('IClientsRepository') private clientsRepository: IClientsRepository,
    @inject('IUUIDv4Service')
    private uuidV4Service: IUUIDv4Service,
    @inject('IClientsCredentialValidationService')
    private clientsCredentialValidationService: IClientsCredentialValidationService,
  ) {}

  async generateCredentials(credential: ICredentialRequest): Promise<Clients> {
    const validateCredential =
      this.clientsCredentialValidationService.validateCredentials(credential);
    const { userId } = validateCredential;
    const { client_id, client_secret, api_key } = validateCredential.credential;
    let updatedClients = {};

    if (client_id) {
      updatedClients = {
        ...updatedClients,
        client_id: this.generateClientId(userId.getValue()),
      };
    }
    if (client_secret) {
      updatedClients = {
        ...updatedClients,
        client_secret: this.generateClientSecret(),
      };
    }
    if (api_key) {
      updatedClients = {
        ...updatedClients,
        api_key: this.generateAPIKey(),
      };
    }

    return this.updateCredential(userId, updatedClients);
  }

  private async updateCredential(
    userId: BaseId,
    credential: Partial<ICredentialResponse>,
  ): Promise<Clients> {
    const clients = await this.clientsRepository.update(userId, credential);

    if (!clients) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }

    return clients;
  }

  private generateClientId(id: string): string {
    return `${this.uuidV4Service.generate().substring(0, 15)}-${id}`;
  }

  private generateClientSecret(): string {
    return this.uuidV4Service.generate().substring(0, 20);
  }

  private generateAPIKey(): string {
    return this.uuidV4Service.generate();
  }
}

export default ClientsCredentialGenerationService;
