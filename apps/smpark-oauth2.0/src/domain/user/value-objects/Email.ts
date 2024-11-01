import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class Email {
  #email: string;

  constructor(email: string | undefined | null) {
    this.#email = email?.trim().toLowerCase() || '';
  }

  static validate(email: string | undefined | null): Email {
    if (!email) {
      return new Email(email);
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email.toLowerCase())) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.EMAIL);
    }

    return new Email(email);
  }

  getValue(): string {
    return this.#email;
  }
}
export default Email;
