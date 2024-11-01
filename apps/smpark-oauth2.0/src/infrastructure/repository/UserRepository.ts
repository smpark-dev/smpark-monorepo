import { injectable, inject } from 'inversify';
import { Collection, ClientSession } from 'mongodb';

import BaseId from '@domain/shared/value-objects/BaseId';
import BaseScope from '@domain/shared/value-objects/BaseScope';
import User from '@domain/user/entities/User';
import Email from '@domain/user/value-objects/Email';
import MongoDB from '@infrastructure/database/MongoDB';
import UserMapper from '@infrastructure/mapper/UserMapper';

import type { IUserRepository } from '@domain/user/interfaces/repository/IUserRepository';
import type { IUserCollection } from '@infrastructure/interfaces/collections/IUserCollection';

@injectable()
class UserRepository implements IUserRepository<ClientSession> {
  private collection: Collection<IUserCollection>;

  constructor(@inject(MongoDB) private database: MongoDB) {
    this.collection = this.database.getCollection('users');
  }

  async findById(id: BaseId): Promise<User | null> {
    const result = await this.collection.findOne({ id: id.getValue() });
    return result ? UserMapper.toEntity(result) : null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    const result = await this.collection.findOne({ email });
    return result ? UserMapper.toEntity(result) : null;
  }

  async updateAgreedScope(id: BaseId, agreedScope: BaseScope): Promise<boolean> {
    const result = await this.collection.updateOne(
      { id: id.getValue() },
      { $set: { agreedScope: agreedScope.getValue() } },
      { upsert: true },
    );
    return result.modifiedCount > 0 || result.upsertedCount > 0;
  }

  async save(user: User, options?: { transactionContext?: ClientSession }): Promise<boolean> {
    const session = options?.transactionContext;
    const result = await this.collection.insertOne(UserMapper.toDatabase(user), { session });
    return result.acknowledged;
  }
}

export default UserRepository;
