import BaseId from '@domain/shared/value-objects/BaseId';
import Token from '@domain/token/entities/Token';
import TokenId from '@domain/token/value-objects/TokenId';

export interface ITokenRepository<ClientSession = void> {
  findById(id: string): Promise<Token | null>;
  findByRefreshToken(token: string): Promise<BaseId | null>;
  delete(tokenId: TokenId): Promise<boolean>;
  upsert(
    id: BaseId,
    token: Token,
    options?: { transactionContext?: ClientSession },
  ): Promise<boolean>;
}
