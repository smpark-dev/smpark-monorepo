import { inject, injectable } from 'inversify';

import { ScopeRequestDTO } from '@dtos/OAuthDTO';

import type { IUserScopeUpdaterService } from '@application-interfaces/services/auth/IUserScopeUpdaterService';
import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { IUserRepository } from '@domain-interfaces/infrastructure/repository/IUserRepository';

@injectable()
class UserScopeUpdaterService implements IUserScopeUpdaterService {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
  ) {}

  async updateUserScope(scopeRequest: ScopeRequestDTO): Promise<void> {
    const { id, agreedScope, updated } = scopeRequest;
    const verifiedId = this.oAuthVerifierService.verifyId(id);
    const verifiedScope = this.oAuthVerifierService.verifyScope(agreedScope);
    this.oAuthVerifierService.verifyUpdated(updated);

    if (updated) {
      const isUpdated = await this.userRepository.updateAgreedScope(verifiedId, verifiedScope);

      this.oAuthVerifierService.verifyOperation(isUpdated);
    }
  }
}

export default UserScopeUpdaterService;
