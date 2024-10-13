import { inject, injectable } from 'inversify';

import { ClientsDTO } from '@dtos/ClientsDTO';
import { TokenValidateDTO } from '@dtos/OAuthDTO';

import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { IClientsVerifierService } from '@application-interfaces/services/clients/IClientsVerifierService';
import type { IClientsRepository } from '@domain-interfaces/infrastructure/repository/IClientsRepository';

@injectable()
class ClientsVerifierService implements IClientsVerifierService {
  constructor(
    @inject('IClientsRepository') public clientsRepository: IClientsRepository,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
  ) {}

  async validateClient(validatedRequest: TokenValidateDTO): Promise<ClientsDTO> {
    const client = await this.clientsRepository.findByClients({
      clientId: validatedRequest.client_id,
      clientSecret: validatedRequest.client_secret,
    });

    const verifiedClient = this.oAuthVerifierService.verifyClient(client);

    return verifiedClient;
  }
}

export default ClientsVerifierService;
