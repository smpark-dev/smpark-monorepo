import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

export class CodeGenerationRequestDTO {
  id: string;
  redirect_uri: string;
  client_id: string;

  constructor(data: { id?: string; redirect_uri?: string; client_id?: string }) {
    if (!data.id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }
    if (!data.redirect_uri) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI);
    }
    if (!data.client_id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID);
    }

    this.id = data.id;
    this.redirect_uri = data.redirect_uri;
    this.client_id = data.client_id;
  }
}
