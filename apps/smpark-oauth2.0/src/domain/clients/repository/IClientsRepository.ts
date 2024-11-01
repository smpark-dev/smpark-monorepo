import Clients from '@domain/clients/entities/Clients';
import ClientSecret from '@domain/clients/value-objects/ClientSecret';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseId from '@domain/shared/value-objects/BaseId';

import type { IClientsCollection } from '@infrastructure/interfaces/collections/IClientsCollection';

export interface IClientsRepository<ClientSession = void> {
  findById(id: BaseId): Promise<Clients | null>;
  findByClientId(clientId: BaseClientId): Promise<Clients | null>;
  findByClients(credentials: {
    clientId: BaseClientId;
    clientSecret: ClientSecret;
  }): Promise<Clients | null>;
  update(id: BaseId, updates: Partial<IClientsCollection>): Promise<Clients | null>;
  save(
    clients: Clients,
    id: BaseId,
    options?: { transactionContext?: ClientSession },
  ): Promise<boolean>;
}
