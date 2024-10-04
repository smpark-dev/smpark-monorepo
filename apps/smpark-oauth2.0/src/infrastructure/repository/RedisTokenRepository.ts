import createError from 'http-errors';
import { inject, injectable } from 'inversify';

import Redis from '@database/Redis';
import { IRedisTokenRepository } from '@domain-interfaces/repository/IRedisTokenRepository';

@injectable()
class RedisTokenRepository implements IRedisTokenRepository {
  private readonly KEY_PREFIX = 'token:';

  constructor(@inject(Redis) private redisClient: Redis) {}

  private getKey(type: string, userId: string): string {
    return `${this.KEY_PREFIX}${type}:${userId}`;
  }

  async save(type: string, userId: string, token: string, expiresIn: number): Promise<boolean> {
    try {
      const client = this.redisClient.getClient();
      const result = await client.set(this.getKey(type, userId), token, { EX: expiresIn });
      return result === 'OK';
    } catch (error) {
      throw createError(500, `Failed to save ${type} token`, { cause: error });
    }
  }

  async find(type: string, userId: string): Promise<string | null> {
    try {
      const client = this.redisClient.getClient();
      return client.get(this.getKey(type, userId));
    } catch (error) {
      throw createError(500, `Failed to find ${type} token`, { cause: error });
    }
  }

  async delete(type: string, userId: string): Promise<boolean> {
    try {
      const client = this.redisClient.getClient();
      const result = await client.del(this.getKey(type, userId));
      return result > 0;
    } catch (error) {
      throw createError(500, `Failed to delete ${type} token`, { cause: error });
    }
  }
}

export default RedisTokenRepository;
