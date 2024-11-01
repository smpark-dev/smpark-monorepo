import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

export class UserRegisterRequestDTO {
  id?: string;
  password?: string;
  name?: string;
  email?: string;

  constructor(data: { id: string; password: string; name: string; email: string }) {
    this.id = data.id;
    this.password = data.password;
    this.name = data.name;
    this.email = data.email;

    if (!this.id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }
    if (!this.password) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.PASSWORD);
    }
    if (!this.name) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.NAME);
    }
    if (!this.email) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.EMAIL);
    }
  }
}
