import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

export class UserLoginRequestDTO {
  id: string;
  password: string;

  constructor(data: { id: string; password: string; client_id: string; redirect_uri: string }) {
    if (!data.id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }
    if (!data.password) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.PASSWORD);
    }

    this.id = data.id;
    this.password = data.password;
  }
}
