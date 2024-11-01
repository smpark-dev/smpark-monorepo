import { injectable, inject } from 'inversify';

import type {
  IUserRegisterRequest,
  IUserRegistrationUseCase,
} from '@application/user/interfaces/usecases/IUserRegistrationUseCase';
import type { IUserRegistrationService } from '@domain/user/interfaces/services/IUserRegistrationService';

@injectable()
class RegistrationUseCase implements IUserRegistrationUseCase {
  constructor(
    @inject('IUserRegistrationService')
    private userRegistrationService: IUserRegistrationService,
  ) {}

  async execute(userRegisterRequest: IUserRegisterRequest): Promise<void> {
    await this.userRegistrationService.registerUser(userRegisterRequest);
  }
}

export default RegistrationUseCase;
