import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

export class CredentialRequestDTO {
  id: string;
  client_id?: boolean;
  client_secret?: boolean;
  api_key?: boolean;

  constructor(
    data: {
      client_id?: boolean;
      client_secret?: boolean;
      api_key?: boolean;
    },
    id?: string,
  ) {
    if (!data.client_id && !data.client_secret && !data.api_key) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CREDENTIAL);
    }
    if (!id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }

    this.id = id;
    this.client_id = data.client_id;
    this.client_secret = data.client_secret;
    this.api_key = data.api_key;
  }
}
