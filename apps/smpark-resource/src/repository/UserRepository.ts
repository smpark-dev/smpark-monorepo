import env from '@configs/env';
import MongoDB from '@configs/MongoDB';
import { Collection } from 'mongodb';

export interface IMember {
  id: string;
  name: string;
  email: string;
  [key: string]: string;
}

class ClientsRepository {
  private collection: Collection<IMember>;

  constructor() {
    this.collection = MongoDB.getInstance(env.mongoDBUri, env.mongoDBName).getCollection<IMember>(
      'members',
    );
  }

  async findById(id: string): Promise<Omit<IMember, 'password'> | null> {
    const result = await this.collection.findOne({ id }, { projection: { password: 0 } });
    return result;
  }
}

export default ClientsRepository;
