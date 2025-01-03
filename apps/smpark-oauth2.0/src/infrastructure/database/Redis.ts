import { inject, injectable } from 'inversify';
import { createClient, RedisClientType } from 'redis';

import { CustomError } from '@domain/shared/errors/CustomError';

@injectable()
class Redis {
  private client: RedisClientType | undefined;
  private url: string;

  constructor(@inject('RedisURL') url: string) {
    this.url = url;
  }

  async connect(): Promise<void> {
    try {
      this.client = createClient({ url: this.url });
      this.client.on('error', (err) => console.error('Redis Client Error', err));
      await this.client.connect();
      console.log('Connected to Redis!');
    } catch (error) {
      throw new CustomError(500, 'Failed to connect to Redis');
    }
  }

  getClient(): RedisClientType {
    if (!this.client) {
      throw new CustomError(500, 'Redis not connected');
    }
    return this.client;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.quit();
      this.client = undefined;
      console.log('Disconnected from Redis');
    }
  }
}

export default Redis;
