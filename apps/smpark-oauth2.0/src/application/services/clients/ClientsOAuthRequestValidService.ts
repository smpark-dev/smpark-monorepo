import { inject, injectable } from 'inversify';

import { AuthorizeRequestDTO } from '@dtos/OAuthDTO';
import ClientsMapper from '@mapper/ClientsMapper';

import type { IClientsOAuthRequestValidService } from '@application-interfaces/services/clients/IClientsOAuthRequestValidService';
import type { IClientsOAuthValidService } from '@application-interfaces/services/clients/IClientsOAuthValidService';
import type { IClientsRepository } from '@domain-interfaces/infrastructure/repository/IClientsRepository';

@injectable()
class ClientsOAuthRequestValidService implements IClientsOAuthRequestValidService {
  constructor(
    @inject('IClientsRepository') private clientsRepository: IClientsRepository,
    @inject('IClientsOAuthValidService')
    private clientsOAuthValidService: IClientsOAuthValidService,
    @inject(ClientsMapper) private clientsMapper: ClientsMapper,
  ) {}

  async validateRequestOAuth(authorizeRequest: AuthorizeRequestDTO): Promise<string> {
    const { client_id } =
      this.clientsOAuthValidService.validateAuthorizationRequest(authorizeRequest);
    const fetchedClient = await this.clientsRepository.findByClientId(client_id);
    const { address_uri } = this.clientsOAuthValidService.validateAuthorizationRequest(
      authorizeRequest,
      fetchedClient ? this.clientsMapper.toRequestValidDTO(fetchedClient) : null,
    );

    return address_uri;
  }
}

export default ClientsOAuthRequestValidService;
