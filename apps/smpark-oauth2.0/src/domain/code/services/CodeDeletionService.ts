import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { ICodeDeletionService } from '@domain/code/interfaces/services/ICodeDeletionService';
import { CustomError } from '@domain/shared/errors/CustomError';
import User from '@domain/user/entities/User';

import type { ICodeRepository } from '@domain/code/interfaces/repository/ICodeRepository';

@injectable()
class CodeDeletionService implements ICodeDeletionService {
  constructor(@inject('ICodeRepository') private codeRepository: ICodeRepository) {}

  async deleteCode(userId: string) {
    const id = User.validateUserId(userId);
    const code = await this.codeRepository.findById(id);

    if (code) {
      const isDeleted = this.codeRepository.delete(code.code);

      if (!isDeleted) {
        throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
      }
    }
  }
}

export default CodeDeletionService;
