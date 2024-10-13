import createError from 'http-errors';
import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CredentialRequestDTO, CredentialResponseDTO } from '@dtos/ClientsDTO';

import type { IClientsGenerationService } from '@application-interfaces/services/clients/IClientsGenerationService';
import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { IClientsRepository } from '@domain-interfaces/infrastructure/repository/IClientsRepository';

@injectable()
class ClientsGenerationService implements IClientsGenerationService {
  constructor(
    @inject('IClientsRepository') public clientsRepository: IClientsRepository,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
  ) {}

  async generateClient(
    credentialRequest: CredentialRequestDTO,
  ): Promise<CredentialResponseDTO | null> {
    const verifiedId = this.oAuthVerifierService.verifyId(credentialRequest.id);
    const verifiedCredential = this.verifyCredentialRequest(credentialRequest);
    const { client_id, client_secret, api_key } = verifiedCredential;
    let updatedClients = {};

    if (client_id) {
      updatedClients = {
        ...updatedClients,
        client_id: this.generateClientId(verifiedId),
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

    const fetchedClients = await this.clientsRepository.update(verifiedId, updatedClients);

    this.oAuthVerifierService.verifyOperation(!!fetchedClients);

    return fetchedClients;
  }

  private generateClientId(id: string): string {
    return `${uuidv4().substring(0, 15)}-${id}`;
  }

  private generateClientSecret(): string {
    return uuidv4().substring(0, 20);
  }

  private generateAPIKey(): string {
    return uuidv4();
  }

  private verifyCredentialRequest(credentialRequest: CredentialRequestDTO): CredentialRequestDTO {
    const { client_id, client_secret, api_key } = credentialRequest;

    if (!client_id && !client_secret && !api_key) {
      throw createError(401, ERROR_MESSAGES.NOT_FOUND.CREDENTIAL);
    }

    return { client_id, client_secret, api_key };
  }
}

export default ClientsGenerationService;
