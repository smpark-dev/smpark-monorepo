import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class ManagerList {
  #managerList: string[];

  constructor(managerList: string[]) {
    this.#managerList = managerList;
    this.validate();
  }

  private validate(): void {
    if (!Array.isArray(this.#managerList)) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.MANAGER_LIST);
    }

    const allStrings = this.#managerList.every((item) => typeof item === 'string');
    if (!allStrings) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.MANAGER_LIST);
    }
  }

  getValue(): string[] {
    return this.#managerList;
  }
}

export default ManagerList;
