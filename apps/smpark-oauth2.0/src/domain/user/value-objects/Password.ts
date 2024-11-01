import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class Password {
  #hashedPassword: string;

  constructor(hashedPassword: string | undefined | null) {
    this.#hashedPassword = hashedPassword?.trim() || '';
  }

  static validate(hashedPassword: string | undefined | null): Password {
    if (!hashedPassword && hashedPassword?.trim() === '') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.PASSWORD);
    }

    return new Password(hashedPassword);
  }

  getValue(): string {
    return this.#hashedPassword;
  }
}
export default Password;
