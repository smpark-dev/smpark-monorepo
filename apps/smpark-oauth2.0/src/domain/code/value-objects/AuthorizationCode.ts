import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class AuthorizationCode {
  #code: string;

  constructor(code: string | null | undefined) {
    this.#code = code?.trim() || '';
  }

  static validate(code: string | null | undefined): AuthorizationCode {
    if (!code || code.trim() === '') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CODE);
    }

    return new AuthorizationCode(code);
  }

  getValue(): string {
    return this.#code;
  }
}

export default AuthorizationCode;
