import { injectable, inject } from 'inversify';

import { IClientGenerationUseCase } from '@application-interfaces/usecases/IClientsUseCase';
import { CredentialRequestDTO, CredentialResponseDTO } from '@dtos/ClientsDTO';

import type { IClientsRepository } from '@domain-interfaces/repository/IClientsRepository';
import type { IClientsService } from '@domain-interfaces/services/IClientsService';
import type { IOAuthVerifierService } from '@domain-interfaces/services/IOAuthVerifierService';

@injectable()
class ClientGenerationUseCase implements IClientGenerationUseCase {
  constructor(
    @inject('IClientsService') public clientsService: IClientsService,
    @inject('IClientsRepository') public clientsRepository: IClientsRepository,
    @inject('IOAuthVerifierService') private oAuthVerifierService: IOAuthVerifierService,
  ) {}

  async execute(credentialRequest: CredentialRequestDTO): Promise<CredentialResponseDTO | null> {
    const verifiedId = this.oAuthVerifierService.verifyId(credentialRequest.id);
    const verifiedCredential = this.clientsService.verifyCredentialRequest(credentialRequest);
    const { client_id, client_secret, api_key } = verifiedCredential;
    let updatedClients = {};

    if (client_id) {
      updatedClients = {
        ...updatedClients,
        client_id: this.clientsService.generateClientId(verifiedId),
      };
    }
    if (client_secret) {
      updatedClients = {
        ...updatedClients,
        client_secret: this.clientsService.generateClientSecret(),
      };
    }
    if (api_key) {
      updatedClients = {
        ...updatedClients,
        api_key: this.clientsService.generateAPIKey(),
      };
    }

    const fetchedClients = await this.clientsRepository.update(verifiedId, updatedClients);

    this.oAuthVerifierService.verifyOperation(!!fetchedClients);

    return fetchedClients;
  }
}
export default ClientGenerationUseCase;