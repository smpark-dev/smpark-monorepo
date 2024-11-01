import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class ApplicationName {
  #applicationName: string;

  constructor(applicationName: string | null | undefined) {
    this.#applicationName = applicationName || '';
  }

  static validate(applicationName: string | undefined | null): ApplicationName {
    if (!applicationName || applicationName.trim() === '') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.APPLICATION_NAME);
    }

    return new ApplicationName(applicationName);
  }

  getValue(): string {
    return this.#applicationName;
  }
}

export default ApplicationName;
