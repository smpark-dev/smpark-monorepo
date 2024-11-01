import Clients from '@domain/clients/entities/Clients';

import type { ICredentialsResponse } from '@application/clients/interfaces/usecases/IClientsCredentialsGenerationUseCase';

export class ClientsCredentialsMapper {
  static toClientCredentials(clients: Clients): ICredentialsResponse {
    return {
      client_id: clients.client_id.getValue() || '',
      client_secret: clients.client_secret.getValue() || '',
      api_key: clients.api_key || '',
    };
  }
}
