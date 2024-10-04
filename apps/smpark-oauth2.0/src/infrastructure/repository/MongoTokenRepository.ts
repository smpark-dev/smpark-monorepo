import { injectable, inject } from 'inversify';
import { Collection, ClientSession, DeleteResult } from 'mongodb';

import MongoDB from '@database/MongoDB';
import { IMongoTokenRepository } from '@domain-interfaces/repository/IMongoTokenRepository';
import { TokenDTO } from '@dtos/TokenDTO';

@injectable()
class MongoTokenRepository implements IMongoTokenRepository<ClientSession> {
  private collection: Collection<TokenDTO>;

  constructor(@inject(MongoDB) database: MongoDB) {
    this.collection = database.getCollection('tokens');
  }

  async findById(id: string): Promise<TokenDTO | null> {
    const result = await this.collection.findOne({ id });
    return result || null;
  }

  async upsert(
    token: TokenDTO,
    options?: { transactionContext?: ClientSession },
  ): Promise<boolean> {
    const session = options?.transactionContext;
    const result = await this.collection.updateOne(
      { id: token.id },
      { $set: token },
      { upsert: true, session },
    );
    return result.acknowledged && (result.modifiedCount > 0 || result.upsertedCount > 0);
  }

  async delete(code: string): Promise<DeleteResult> {
    return this.collection.deleteOne({ code });
  }
}

export default MongoTokenRepository;
