import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';
import BaseScope from '@domain/shared/value-objects/BaseScope';
import User from '@domain/user/entities/User';

import type { IUserRepository } from '@domain/user/interfaces/repository/IUserRepository';
import type {
  IAgreedScopeUpdate,
  IUserScopeUpdaterService,
} from '@domain/user/interfaces/services/IUserScopeUpdaterService';

@injectable()
class UserScopeUpdaterService implements IUserScopeUpdaterService {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}

  async updateAgreedScope(agreedScopeRequest: IAgreedScopeUpdate): Promise<void> {
    const { id, agreedScope, isUpdated } = agreedScopeRequest;
    const validatedUserId = User.validateUserId(id);
    const validatedAgreedScope = User.createScope(agreedScope);

    if (isUpdated) {
      this.updateAgreeScope(validatedUserId, validatedAgreedScope);
    }
  }

  private async updateAgreeScope(userId: BaseId, AgreedScope: BaseScope) {
    const isUpdatedResult = await this.userRepository.updateAgreedScope(userId, AgreedScope);

    if (!isUpdatedResult) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }
  }
}

export default UserScopeUpdaterService;
