import { Collection } from 'mongodb';

import env from '@configs/env';
import MongoDB from '@configs/MongoDB';

export interface IUserCollection {
  id: string;
  password: string;
  name: string;
  email: string;
  agreedScope?: { id: boolean; email: boolean; name: boolean };
}

class ClientsRepository {
  private collection: Collection<IUserCollection>;

  constructor() {
    this.collection = MongoDB.getInstance(
      env.mongoDBUri,
      env.mongoDBName,
    ).getCollection<IUserCollection>('users');
  }

  async findById(id: string): Promise<Omit<IUserCollection, 'password'> | null> {
    const result = await this.collection.findOne({ id }, { projection: { password: 0 } });
    return result;
  }
}

export default ClientsRepository;
