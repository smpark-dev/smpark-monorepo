import { injectable, inject } from 'inversify';

import { ClientsCredentialsMapper } from '@application/clients/mapper/ClientsCredentialsMapper';

import type {
  IClientsCredentialsGenerationUseCase,
  ICredentialsResponse,
  ICredentialRequest,
} from '@application/clients/interfaces/usecases/IClientsCredentialsGenerationUseCase';
import type { IClientsCredentialGenerationService } from '@domain/clients/interfaces/services/IClientsCredentialGenerationService';

@injectable()
class ClientsCredentialsGenerationUseCase implements IClientsCredentialsGenerationUseCase {
  constructor(
    @inject('IClientsCredentialGenerationService')
    private clientsCredentialGenerationService: IClientsCredentialGenerationService,
  ) {}

  async execute(credentialRequest: ICredentialRequest): Promise<ICredentialsResponse | null> {
    const generatedCredential =
      await this.clientsCredentialGenerationService.generateCredentials(credentialRequest);

    return ClientsCredentialsMapper.toClientCredentials(generatedCredential);
  }
}
export default ClientsCredentialsGenerationUseCase;
