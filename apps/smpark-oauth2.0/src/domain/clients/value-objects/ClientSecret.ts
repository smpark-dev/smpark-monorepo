import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class ClientSecret {
  #clientSecret: string;

  constructor(clientSecret: string | null | undefined) {
    this.#clientSecret = clientSecret?.trim() || '';
  }

  static validate(clientSecret: string | null | undefined): ClientSecret {
    if (!clientSecret || clientSecret.trim() === '') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_SECRET);
    }

    return new ClientSecret(clientSecret);
  }

  getValue(): string {
    return this.#clientSecret;
  }
}

export default ClientSecret;
