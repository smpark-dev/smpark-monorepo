import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class BaseId {
  #id: string;

  constructor(id: string | undefined | null) {
    this.#id = id?.trim().toLowerCase() || '';
  }

  static validate(id: string | undefined | null): BaseId {
    if (!id || id.trim() === '') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }

    const idPattern = /^[a-zA-Z][a-zA-Z0-9_]{3,15}$/;
    if (!idPattern.test(id)) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.USERNAME);
    }

    return new BaseId(id);
  }

  getValue(): string {
    return this.#id;
  }
}

export default BaseId;
