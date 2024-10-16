import { injectable, inject } from 'inversify';
import { ClientSession, Collection } from 'mongodb';

import MongoDB from '@database/MongoDB';
import { ClientsDTO, CredentialResponseDTO } from '@dtos/ClientsDTO';
import ClientsMapper from '@mapper/ClientsMapper';

import type { IClientsRepository } from '@domain-interfaces/infrastructure/repository/IClientsRepository';

@injectable()
class ClientsRepository implements IClientsRepository<ClientSession> {
  private collection: Collection<ClientsDTO>;

  constructor(
    @inject(MongoDB) public database: MongoDB,
    @inject(ClientsMapper) private clientsMapper: ClientsMapper,
  ) {
    this.collection = database.getCollection('clients');
  }

  async findById(id: string): Promise<ClientsDTO | null> {
    const result = await this.collection.findOne({ id });
    return result || null;
  }

  async findByClientId(clientId: string): Promise<ClientsDTO | null> {
    const result = await this.collection.findOne({ client_id: clientId });
    return result || null;
  }

  async findByClients(credentials: {
    clientId: string;
    clientSecret: string;
  }): Promise<ClientsDTO | null> {
    const result = await this.collection.findOne({
      client_id: credentials.clientId,
      client_secret: credentials.clientSecret,
    });
    return result || null;
  }

  async update(id: string, updates: Partial<ClientsDTO>): Promise<CredentialResponseDTO | null> {
    const result = await this.collection.findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after', upsert: true },
    );

    return result ? this.clientsMapper.toCredentialResponseDTO(result) : null;
  }

  async save(
    client: ClientsDTO,
    options?: { transactionContext?: ClientSession },
  ): Promise<boolean> {
    const session = options?.transactionContext;
    const result = await this.collection.updateOne(
      { id: client.id },
      { $set: client },
      { upsert: true, session },
    );
    return result.acknowledged && result.matchedCount > 0;
  }
}

export default ClientsRepository;
