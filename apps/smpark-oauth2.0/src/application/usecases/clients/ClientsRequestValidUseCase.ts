import { injectable, inject } from 'inversify';

import { AuthorizeRequestDTO } from '@dtos/OAuthDTO';

import type { IClientsOAuthRequestValidService } from '@application-interfaces/services/clients/IClientsOAuthRequestValidService';
import type { IClientsRequestValidUseCase } from '@application-interfaces/usecases/IClientsUseCase';

@injectable()
class ClientsRequestValidUseCase implements IClientsRequestValidUseCase {
  constructor(
    @inject('IClientsOAuthRequestValidService')
    private clientsOAuthRequestValidService: IClientsOAuthRequestValidService,
  ) {}

  async execute(authorizeRequest: AuthorizeRequestDTO): Promise<string> {
    const address_uri =
      await this.clientsOAuthRequestValidService.validateRequestOAuth(authorizeRequest);

    return address_uri;
  }
}

export default ClientsRequestValidUseCase;
