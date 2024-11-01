import Clients from '@domain/clients/entities/Clients';

import type { IClientsLoadResponse } from '@application/clients/interfaces/usecases/IClientsDetailsLoaderUseCase';

export class ClientsLoadMapper {
  static toClientLoad(clients: Clients): IClientsLoadResponse {
    return {
      client_id: clients.client_id.getValue(),
      client_secret: clients.client_secret.getValue(),
      application_name: clients.application_name.getValue(),
      redirect_uri: clients.redirect_uri.getValue(),
      address_uri: clients.address_uri.getValue(),
      clientAllowedScopes: clients.clientAllowedScopes?.getValue(),
      grant_type: clients.grant_type?.getValue(),
      api_key: clients?.api_key,
      manager_list: clients.manager_list?.getValue(),
    };
  }
}
