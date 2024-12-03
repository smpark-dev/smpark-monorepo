import { injectable, inject } from 'inversify';
import { Collection, ClientSession } from 'mongodb';

import BaseId from '@domain/shared/value-objects/BaseId';
import Token from '@domain/token/entities/Token';
import TokenId from '@domain/token/value-objects/TokenId';
import MongoDB from '@infrastructure/database/MongoDB';
import TokenMapper from '@infrastructure/mapper/TokenMapper';

import type { ITokenRepository } from '@domain/token/interfaces/repository/ITokenRepository';
import type { ITokenCollection } from '@infrastructure/interfaces/collections/ITokenCollection';

@injectable()
class MongoTokenRepository implements ITokenRepository<ClientSession> {
  private collection: Collection<ITokenCollection>;

  constructor(@inject(MongoDB) database: MongoDB) {
    this.collection = database.getCollection('tokens');
  }

  async findById(id: string): Promise<Token | null> {
    const result = await this.collection.findOne({ id });
    return result ? TokenMapper.toEntity(result) : null;
  }

  async findByRefreshToken(refreshToken: string): Promise<BaseId | null> {
    const result = await this.collection.findOne({ refreshToken });
    return result ? TokenMapper.toId(result) : null;
  }

  async upsert(
    id: BaseId,
    token: Token,
    options?: { transactionContext?: ClientSession },
  ): Promise<boolean> {
    const session = options?.transactionContext;
    const result = await this.collection.updateOne(
      { id: id.getValue() },
      { $set: TokenMapper.toDatabase(token, id.getValue()) },
      { upsert: true, session },
    );
    return result.acknowledged && (result.modifiedCount > 0 || result.upsertedCount > 0);
  }

  async delete(tokenId: TokenId): Promise<boolean> {
    const result = await this.collection.deleteOne({ token: tokenId.getValue() });
    return result.acknowledged;
  }
}

export default MongoTokenRepository;
