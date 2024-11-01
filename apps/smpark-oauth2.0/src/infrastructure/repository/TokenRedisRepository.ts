import { inject, injectable } from 'inversify';

import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';
import AuthToken from '@domain/token/value-objects/AuthToken';
import Redis from '@infrastructure/database/Redis';

import type { ITokenRedisRepository } from '@domain/token/interfaces/repository/ITokenRedisRepository';

@injectable()
class TokenRedisRepository implements ITokenRedisRepository {
  private readonly KEY_PREFIX = 'refresh_token:';

  constructor(@inject(Redis) private redisClient: Redis) {}

  private getKey(userId: string): string {
    return `${this.KEY_PREFIX}:${userId}`;
  }

  async save(userId: BaseId, token: AuthToken, expiresIn: number): Promise<boolean> {
    try {
      const client = this.redisClient.getClient();
      const result = await client.set(this.getKey(userId.getValue()), token.getValue(), {
        EX: expiresIn,
      });
      return result === 'OK';
    } catch (error) {
      throw new CustomError(500, `Failed to save ${this.KEY_PREFIX} token`);
    }
  }

  async find(userId: BaseId): Promise<string | null> {
    try {
      const client = this.redisClient.getClient();
      return client.get(this.getKey(userId.getValue()));
    } catch (error) {
      throw new CustomError(500, `Failed to find ${this.KEY_PREFIX} token`);
    }
  }

  async delete(userId: BaseId): Promise<boolean> {
    try {
      const client = this.redisClient.getClient();
      const result = await client.del(this.getKey(userId.getValue()));
      return result > 0;
    } catch (error) {
      throw new CustomError(500, `Failed to delete ${this.KEY_PREFIX} token`);
    }
  }
}

export default TokenRedisRepository;
