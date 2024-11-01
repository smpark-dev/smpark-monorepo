import { injectable, inject } from 'inversify';
import { Collection } from 'mongodb';

import AuthorizationCode from '@domain/code/value-objects/AuthorizationCode';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseId from '@domain/shared/value-objects/BaseId';
import User from '@domain/user/entities/User';
import MongoDB from '@infrastructure/database/MongoDB';
import CodeMapper from '@infrastructure/mapper/CodeMapper';

import type Code from '@domain/code/entities/Code';
import type { ICodeRepository } from '@domain/code/interfaces/repository/ICodeRepository';
import type { ICodeCollection } from '@infrastructure/interfaces/collections/ICodeCollection';

@injectable()
class CodeRepository implements ICodeRepository {
  private collection: Collection<ICodeCollection>;

  constructor(@inject(MongoDB) database: MongoDB) {
    this.collection = database.getCollection('codes');
  }

  async findById(id: BaseId): Promise<Code | null> {
    const result = await this.collection.findOne({ id: id.getValue() });
    return result ? CodeMapper.toEntity(result) : null;
  }

  async findByCode(code: AuthorizationCode): Promise<{ code: Code; userId: BaseId } | null> {
    const result = await this.collection.findOne({ code: code.getValue() });
    return result
      ? { code: CodeMapper.toEntity(result), userId: User.validateUserId(result.id) }
      : null;
  }

  async update(code: Code, userId: BaseId, clientId: BaseClientId): Promise<boolean> {
    const CodeData = CodeMapper.toDataBase(code, userId, clientId);
    const result = await this.collection.updateOne(
      { id: userId.getValue() },
      { $set: CodeData },
      { upsert: true },
    );
    return result.modifiedCount > 0 || result.upsertedCount > 0;
  }

  async delete(code: AuthorizationCode): Promise<boolean> {
    const result = await this.collection.deleteOne({ code: code.getValue() });
    return result.acknowledged;
  }
}

export default CodeRepository;
