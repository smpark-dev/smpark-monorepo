import { inject, injectable } from 'inversify';
import { MongoClient, Collection, Document } from 'mongodb';

import { CustomError } from '@domain/shared/errors/CustomError';

@injectable()
class MongoDB {
  private client: MongoClient | undefined;
  private dbName: string;
  private url: string;

  constructor(@inject('DbURL') url: string, @inject('DbName') dbName: string) {
    this.url = url;
    this.dbName = dbName;
  }

  async connect(): Promise<void> {
    try {
      this.client = await new MongoClient(this.url).connect();
      console.log('Connected to MongoDB!');
    } catch (error) {
      throw new CustomError(500, 'Failed to connect to MongoDB');
    }
  }

  getCollection<T extends Document>(name: string): Collection<T> {
    if (!this.client) {
      throw new CustomError(500, 'MongoDB not connected');
    }
    return this.client.db(this.dbName).collection(name);
  }

  getClient(): MongoClient {
    if (!this.client) {
      throw new CustomError(500, 'MongoDB not connected');
    }
    return this.client;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}

export default MongoDB;
