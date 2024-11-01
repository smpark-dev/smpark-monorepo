import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class BaseClientId {
  #clientId: string;

  constructor(clientId: string | undefined | null) {
    this.#clientId = clientId?.trim() || '';
  }

  static validate(clientId: string | undefined | null): BaseClientId {
    if (!clientId || clientId.trim() === '') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID);
    }

    return new BaseClientId(clientId);
  }

  getValue(): string {
    return this.#clientId;
  }
}

export default BaseClientId;
