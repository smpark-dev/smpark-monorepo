import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';
import { deepEqual } from '@utils/deepEqual';

export interface IScope extends Record<string, boolean> {
  id: boolean;
  email: boolean;
  name: boolean;
}

class BaseScope {
  #scope: IScope;

  constructor(scope: IScope) {
    this.#scope = { ...scope };
  }

  static validate(scope: IScope): BaseScope {
    if (!scope) {
      throw new CustomError(400, ERROR_MESSAGES.NOT_FOUND.SCOPE);
    }

    if (
      typeof scope.id !== 'boolean' ||
      typeof scope.email !== 'boolean' ||
      typeof scope.name !== 'boolean'
    ) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.SCOPE);
    }

    return new BaseScope(scope);
  }

  compareWithScope(first_scopes: IScope, second_scopes: IScope): boolean {
    return deepEqual(first_scopes, second_scopes);
  }

  getValue(): IScope {
    return { ...this.#scope };
  }

  hasScope(scope: keyof IScope): boolean {
    return this.#scope[scope];
  }
}
export default BaseScope;
