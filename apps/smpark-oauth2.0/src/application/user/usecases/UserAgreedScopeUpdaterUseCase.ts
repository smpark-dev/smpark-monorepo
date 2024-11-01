import { injectable, inject } from 'inversify';

import type {
  IAgreedScopeRequest,
  IUserAgreedScopeUpdaterUseCase,
} from '@application/user/interfaces/usecases/IUserAgreedScopeUpdaterUseCase';
import type { IUserScopeUpdaterService } from '@domain/user/interfaces/services/IUserScopeUpdaterService';

@injectable()
class UserAgreedScopeUpdaterUseCase implements IUserAgreedScopeUpdaterUseCase {
  constructor(
    @inject('IUserScopeUpdaterService')
    private userScopeUpdaterService: IUserScopeUpdaterService,
  ) {}

  async execute(agreedScopeRequest: IAgreedScopeRequest): Promise<void> {
    await this.userScopeUpdaterService.updateAgreedScope(agreedScopeRequest);
  }
}

export default UserAgreedScopeUpdaterUseCase;
