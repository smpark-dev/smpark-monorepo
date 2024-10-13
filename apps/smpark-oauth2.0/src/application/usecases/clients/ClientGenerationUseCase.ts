import { injectable, inject } from 'inversify';

import { CredentialRequestDTO, CredentialResponseDTO } from '@dtos/ClientsDTO';

import type { IClientsGenerationService } from '@application-interfaces/services/clients/IClientsGenerationService';
import type { IClientGenerationUseCase } from '@application-interfaces/usecases/IClientsUseCase';
import type { IClientsRepository } from '@domain-interfaces/infrastructure/repository/IClientsRepository';

@injectable()
class ClientGenerationUseCase implements IClientGenerationUseCase {
  constructor(
    @inject('IClientsGenerationService') public clientsGeneratorService: IClientsGenerationService,
    @inject('IClientsRepository') public clientsRepository: IClientsRepository,
  ) {}

  async execute(credentialRequest: CredentialRequestDTO): Promise<CredentialResponseDTO | null> {
    const fetchedClients = await this.clientsGeneratorService.generateClient(credentialRequest);

    return fetchedClients;
  }
}
export default ClientGenerationUseCase;
