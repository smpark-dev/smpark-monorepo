import Clients from '@domain/clients/entities/Clients';

export class ClientsAuthorizationMapper {
  static toClientAuthorize(clients: Clients): string {
    return clients.address_uri.getValue();
  }
}
