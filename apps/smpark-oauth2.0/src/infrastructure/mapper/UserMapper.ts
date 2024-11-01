import { injectable } from 'inversify';

import User from '@domain/user/entities/User';
import { IUserCollection } from '@infrastructure/interfaces/collections/IUserCollection';

@injectable()
class UserMapper {
  static toDatabase(user: User): IUserCollection {
    return {
      id: user.id.getValue(),
      password: user.password.getValue(),
      name: user.name.getValue(),
      email: user.email.getValue(),
      agreedScope: user.agreedScope?.getValue(),
    };
  }

  static toEntity({ id, password, name, email, agreedScope }: IUserCollection): User {
    return User.create({ id, password, name, email, agreedScope });
  }
}

export default UserMapper;
