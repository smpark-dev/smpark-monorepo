import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

export type GrantTypeOptions = 'authorization_code' | 'refresh_token';

class GrantType {
  #grantType: GrantTypeOptions;

  constructor(grantType: GrantTypeOptions) {
    this.#grantType = grantType;
    this.validate();
  }

  private validate(): void {
    if (this.#grantType !== 'authorization_code' && this.#grantType !== 'refresh_token') {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.UNSUPPORTED.GRANT_TYPE);
    }
  }

  getValue(): GrantTypeOptions {
    return this.#grantType;
  }
}

export default GrantType;
