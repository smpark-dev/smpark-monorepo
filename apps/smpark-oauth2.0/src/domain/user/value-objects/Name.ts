import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class Name {
  #name: string;

  constructor(name: string | undefined | null) {
    this.#name = name?.trim() || '';
  }

  static validate(name: string | undefined | null): Name {
    if (!name || name?.trim() === '0') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.NAME);
    }

    if (name.trim().length > 15) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.NAME);
    }

    return new Name(name);
  }

  getValue(): string {
    return this.#name;
  }
}
export default Name;
