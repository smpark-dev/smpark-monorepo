import { injectable, inject } from 'inversify';
import { ClientSession, Collection } from 'mongodb';

import Clients from '@domain/clients/entities/Clients';
import ClientSecret from '@domain/clients/value-objects/ClientSecret';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseId from '@domain/shared/value-objects/BaseId';
import MongoDB from '@infrastructure/database/MongoDB';
import { IClientsCollection } from '@infrastructure/interfaces/collections/IClientsCollection';
import ClientsMapper from '@infrastructure/mapper/ClientsMapper';

import type { IClientsRepository } from '@domain/clients/repository/IClientsRepository';

@injectable()
class ClientsRepository implements IClientsRepository<ClientSession> {
  private collection: Collection<IClientsCollection>;

  constructor(@inject(MongoDB) private database: MongoDB) {
    this.collection = this.database.getCollection('clients');
  }

  async findById(id: BaseId): Promise<Clients | null> {
    const result = await this.collection.findOne({ id: id.getValue() });
    return result ? ClientsMapper.toEntity(result) : null;
  }

  async findByClientId(clientId: BaseClientId): Promise<Clients | null> {
    const result = await this.collection.findOne({ client_id: clientId.getValue() });
    return result ? ClientsMapper.toEntity(result) : null;
  }

  async findByClients(credentials: {
    clientId: BaseClientId;
    clientSecret: ClientSecret;
  }): Promise<Clients | null> {
    const result = await this.collection.findOne({
      client_id: credentials.clientId.getValue(),
      client_secret: credentials.clientSecret.getValue(),
    });
    return result ? ClientsMapper.toEntity(result) : null;
  }

  async update(id: BaseId, updates: Partial<IClientsCollection>): Promise<Clients | null> {
    const result = await this.collection.findOneAndUpdate(
      { id: id.getValue() },
      { $set: updates },
      { returnDocument: 'after', upsert: true },
    );
    return result ? ClientsMapper.toEntity(result) : null;
  }

  async save(
    clients: Clients,
    id: BaseId,
    options?: { transactionContext?: ClientSession },
  ): Promise<boolean> {
    const session = options?.transactionContext;
    const result = await this.collection.updateOne(
      { id: id.getValue() },
      { $set: ClientsMapper.toDatabase(clients, id.getValue()) },
      { upsert: true, session },
    );
    return result.acknowledged && result.matchedCount > 0;
  }
}

export default ClientsRepository;
