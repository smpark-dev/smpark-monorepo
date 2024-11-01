import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';
import User from '@domain/user/entities/User';

import type { IArgon2PasswordService } from '@domain/shared/interfaces/services/IArgon2PasswordService';
import type { IUserRepository } from '@domain/user/interfaces/repository/IUserRepository';
import type {
  IUserRegistrationService,
  IUserRegister,
} from '@domain/user/interfaces/services/IUserRegistrationService';

@injectable()
class UserRegistrationService implements IUserRegistrationService {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IArgon2PasswordService') private argon2PasswordService: IArgon2PasswordService,
  ) {}

  async registerUser(userRegister: IUserRegister): Promise<void> {
    const user = User.create(userRegister);

    await this.checkDuplicateUser(user);

    const hashedPassword = await this.argon2PasswordService.hashedPassword(
      user.password.getValue(),
    );
    user.changePassword(hashedPassword);

    await this.saveUser(user);
  }

  private async checkDuplicateUser(user: User): Promise<void> {
    const fetchedUser = await this.userRepository.findById(user.id);

    if (fetchedUser) {
      throw new CustomError(409, ERROR_MESSAGES.VALIDATION.DUPLICATE.ID);
    }
  }

  private async saveUser(user: User): Promise<void> {
    const isSaved = await this.userRepository.save(user);

    if (!isSaved) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }
  }
}

export default UserRegistrationService;
