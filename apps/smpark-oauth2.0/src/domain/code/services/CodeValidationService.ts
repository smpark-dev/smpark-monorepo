import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Code from '@domain/code/entities/Code';
import AuthorizationCode from '@domain/code/value-objects/AuthorizationCode';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';

import type { ICodeRepository } from '@domain/code/interfaces/repository/ICodeRepository';
import type { ICodeValidationService } from '@domain/code/interfaces/services/ICodeValidationService';

@injectable()
class CodeValidationService implements ICodeValidationService {
  constructor(@inject('ICodeRepository') private codeRepository: ICodeRepository) {}

  async validateCode(codeRequest: string): Promise<{ code: Code; userId: BaseId }> {
    const validatedRequestCode = Code.validateCode(codeRequest);
    const { code, userId } = await this.fetchAndValidCode(validatedRequestCode);

    await this.checkExpiredAndDeleteCode(code);

    return { code, userId };
  }

  private async fetchAndValidCode(
    validatedRequestCode: AuthorizationCode,
  ): Promise<{ code: Code; userId: BaseId }> {
    const fetchedCode = await this.codeRepository.findByCode(validatedRequestCode);

    if (!fetchedCode) {
      throw new CustomError(400, ERROR_MESSAGES.NOT_FOUND.CODE);
    }

    return fetchedCode;
  }

  private async checkExpiredAndDeleteCode(code: Code): Promise<void> {
    const isExpired = Code.validateExpiresAt(code.expiresAt.getValue());

    if (isExpired.isExpired()) {
      const isDeleted = await this.codeRepository.delete(code.code);

      if (!isDeleted) {
        throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
      }

      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.EXPIRED.CODE);
    }
  }
}
export default CodeValidationService;
