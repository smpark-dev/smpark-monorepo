import BaseId from '@domain/shared/value-objects/BaseId';
import AuthToken from '@domain/token/value-objects/AuthToken';

export interface ITokenRedisRepository {
  save(userId: BaseId, token: AuthToken, expiresIn: number): Promise<boolean>;
  find(userId: BaseId): Promise<string | null>;
  delete(userId: BaseId): Promise<boolean>;
}
