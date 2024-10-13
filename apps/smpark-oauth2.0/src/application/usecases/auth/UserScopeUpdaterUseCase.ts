import { injectable, inject } from 'inversify';

import { ScopeRequestDTO } from '@dtos/OAuthDTO';

import type { IUserScopeUpdaterService } from '@application-interfaces/services/auth/IUserScopeUpdaterService';
import type { IUserScopeUpdaterUseCase } from '@application-interfaces/usecases/IAuthUseCase';

@injectable()
class UserScopeUpdaterUseCase implements IUserScopeUpdaterUseCase {
  constructor(
    @inject('IUserScopeUpdaterService')
    private userScopeUpdaterService: IUserScopeUpdaterService,
  ) {}

  async execute(scopeRequest: ScopeRequestDTO): Promise<void> {
    await this.userScopeUpdaterService.updateUserScope(scopeRequest);
  }
}

export default UserScopeUpdaterUseCase;
