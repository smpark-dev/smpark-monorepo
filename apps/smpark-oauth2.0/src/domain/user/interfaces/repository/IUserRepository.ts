import BaseId from '@domain/shared/value-objects/BaseId';
import BaseScope from '@domain/shared/value-objects/BaseScope';
import User from '@domain/user/entities/User';
import Email from '@domain/user/value-objects/Email';

export interface IUserRepository<ClientSession = void> {
  findById(id: BaseId): Promise<User | null>;
  findByEmail(email: Email): Promise<User | null>;
  updateAgreedScope(id: BaseId, agreedScope: BaseScope): Promise<boolean>;
  save(user: User, options?: { transactionContext?: ClientSession }): Promise<boolean>;
}
