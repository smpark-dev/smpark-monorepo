import { injectable, inject } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';
import UserId from '@domain/token/value-objects/UserId';
import User from '@domain/user/entities/User';
import Password from '@domain/user/value-objects/Password';

import type { IArgon2PasswordService } from '@domain/shared/interfaces/services/IArgon2PasswordService';
import type { IUserRepository } from '@domain/user/interfaces/repository/IUserRepository';
import type {
  IUserAuthenticationService,
  IUserLogin,
} from '@domain/user/interfaces/services/IUserAuthenticationService';

@injectable()
class UserAuthenticationService implements IUserAuthenticationService {
  constructor(
    @inject('IArgon2PasswordService') private argon2PasswordService: IArgon2PasswordService,
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async authenticateUser(userLogin: IUserLogin): Promise<User> {
    const { id: userId, password } = User.credentialsUser(userLogin.id, userLogin.password);
    const user = await this.fetchAndValidateUser(userId);
    await this.comparePassword(password, user);

    return user;
  }

  private async fetchAndValidateUser(userId: UserId): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new CustomError(401, ERROR_MESSAGES.NOT_FOUND.USER);
    }

    return user;
  }

  private async comparePassword(password: Password, user: User): Promise<void> {
    const validatedPW = password.getValue();
    const hashedPW = user.password.getValue();

    const isCompare = await this.argon2PasswordService.comparePassword(validatedPW, hashedPW);

    if (!isCompare) {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.CREDENTIALS);
    }
  }
}

export default UserAuthenticationService;
