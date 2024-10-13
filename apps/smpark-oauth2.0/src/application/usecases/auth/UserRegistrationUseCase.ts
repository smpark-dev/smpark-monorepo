import { injectable, inject } from 'inversify';

import { RegisterDTO } from '@dtos/UserDTO';

import type { IUserRegistrationService } from '@application-interfaces/services/auth/IUserRegistrationService';
import type { IUserRegistrationUseCase } from '@application-interfaces/usecases/IAuthUseCase';

@injectable()
class UserRegistrationUseCase implements IUserRegistrationUseCase {
  constructor(
    @inject('IUserRegistrationService') private userRegistrationService: IUserRegistrationService,
  ) {}

  async execute(userInfo: RegisterDTO): Promise<void> {
    await this.userRegistrationService.registerUser(userInfo);
  }
}

export default UserRegistrationUseCase;
