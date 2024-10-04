import { injectable } from 'inversify';

import { UserDTO, LoginDTO, RegisterDTO } from '@dtos/UserDTO';
import User from '@entities/User';

@injectable()
class UserMapper {
  toUserDTO(user: User, password: string): UserDTO {
    return new UserDTO(user.id, password, user.name, user.email, user.agreedScopes);
  }

  toRegisterDTO(register: RegisterDTO): RegisterDTO {
    return new RegisterDTO(register.id, register.password, register.name, register.email);
  }

  toLoginDTO(id?: string, password?: string): LoginDTO {
    return new LoginDTO(id, password);
  }

  toEntity({ id, name, email, agreedScopes }: UserDTO): User {
    return new User(id, name, email, agreedScopes);
  }
}

export default UserMapper;
