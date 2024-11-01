import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class BaseExpiresAt {
  #expiresAt: number;

  constructor(expiresAt: number | null | undefined) {
    this.#expiresAt = expiresAt || 0;
  }

  static validate(expiresAt: number | null | undefined): BaseExpiresAt {
    if (!this.isValidNumber(expiresAt || 0)) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.EXPIRED);
    }

    return new BaseExpiresAt(expiresAt);
  }

  private static isValidNumber(value: number): boolean {
    return value !== 0 && !Number.isNaN(value) && Number.isFinite(value);
  }

  getValue(): number {
    return this.#expiresAt;
  }

  isExpired(): boolean {
    return this.#expiresAt < Date.now() / 1000;
  }
}

export default BaseExpiresAt;
