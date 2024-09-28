import createError from 'http-errors';
import { MongoClient, Collection, Document } from 'mongodb';

class MongoDB {
  private static instance: MongoDB;
  private client: MongoClient | undefined;
  private dbName: string;
  private url: string;

  private constructor(url: string, dbName: string) {
    this.url = url;
    this.dbName = dbName;
  }

  public static getInstance(url: string, dbName: string): MongoDB {
    console.log(url);
    console.log(dbName);
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB(url, dbName);
    }
    return MongoDB.instance;
  }

  async connect(): Promise<void> {
    if (!this.client) {
      try {
        this.client = await new MongoClient(this.url).connect();
        console.log('Connected to MongoDB!');
      } catch (error) {
        throw createError(500, 'Failed to connect to MongoDB', { cause: error });
      }
    }
  }

  getCollection<T extends Document>(name: string): Collection<T> {
    if (!this.client) {
      throw createError(500, 'Database not connected');
    }
    return this.client.db(this.dbName).collection(name);
  }

  getClient(): MongoClient {
    if (!this.client) {
      throw createError(500, 'Database not connected');
    }
    return this.client;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
      this.client = undefined;
    }
  }
}

export default MongoDB;
