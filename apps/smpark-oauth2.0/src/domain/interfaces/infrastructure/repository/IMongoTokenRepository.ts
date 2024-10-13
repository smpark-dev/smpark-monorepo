import { DeleteResult } from 'mongodb';

import { TokenDTO } from '@dtos/TokenDTO';

export interface IMongoTokenRepository<TContext = void> {
  findById(id: string): Promise<TokenDTO | null>;
  delete(code: string): Promise<DeleteResult>;
  upsert(token: TokenDTO, option?: { transactionContext?: TContext }): Promise<boolean>;
}
