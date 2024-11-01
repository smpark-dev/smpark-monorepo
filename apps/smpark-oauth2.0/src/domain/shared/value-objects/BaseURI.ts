import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

type URIName = 'REDIRECT_URI' | 'ADDRESS_URI';
type uriType = string | null | undefined;

class BaseURI {
  #uri: string;

  constructor(uri: uriType) {
    this.#uri = uri?.trim() || '';
  }

  static validate(uri: uriType, uriName: URIName): BaseURI {
    if (!uri || uri.trim() === '') {
      const errorMessage =
        uriName === 'REDIRECT_URI'
          ? ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI
          : ERROR_MESSAGES.VALIDATION.MISSING.ADDRESS_URI;
      throw new CustomError(400, errorMessage);
    }

    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|localhost|\\d{1,3}(\\.\\d{1,3}){3})' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );
    if (!urlPattern.test(uri)) {
      const errorMessage =
        uriName === 'REDIRECT_URI'
          ? ERROR_MESSAGES.VALIDATION.FORMAT.REDIRECT_URI
          : ERROR_MESSAGES.VALIDATION.FORMAT.ADDRESS_URI;
      throw new CustomError(400, errorMessage);
    }

    return new BaseURI(uri);
  }

  getValue(): string {
    return this.#uri;
  }
}

export default BaseURI;
