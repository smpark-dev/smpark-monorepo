import { injectable } from 'inversify';

import Clients from '@domain/clients/entities/Clients';
import { IClientsCollection } from '@infrastructure/interfaces/collections/IClientsCollection';

@injectable()
class ClientsMapper {
  static toDatabase(
    clients: Clients,
    id: string,
  ): Omit<IClientsCollection, 'client_id' | 'client_secret'> {
    return {
      id,
      application_name: clients.application_name.getValue(),
      redirect_uri: clients.redirect_uri.getValue(),
      address_uri: clients.address_uri.getValue(),
      clientAllowedScopes: clients.clientAllowedScopes?.getValue(),
      grant_type: clients.grant_type?.getValue() || 'authorization_code',
      manager_list: clients.manager_list?.getValue(),
    };
  }

  static toEntity(clients: IClientsCollection): Clients {
    return Clients.create({
      client_id: clients.client_id,
      client_secret: clients.client_secret,
      application_name: clients.application_name,
      redirect_uri: clients.redirect_uri,
      address_uri: clients.address_uri,
      clientAllowedScopes: clients.clientAllowedScopes,
      grant_type: clients.grant_type,
      api_key: clients.api_key,
      manager_list: clients.manager_list,
    });
  }
}

export default ClientsMapper;
