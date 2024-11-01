import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

class TokenId {
  #tokenId: string;

  constructor(tokenId: string | null | undefined) {
    this.#tokenId = tokenId?.trim() || '';
  }

  static validate(tokenId: string | null | undefined): TokenId {
    if (!tokenId || tokenId.trim() === '') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.TOKEN_ID);
    }

    return new TokenId(tokenId);
  }

  getValue(): string {
    return this.#tokenId;
  }
}

export default TokenId;
