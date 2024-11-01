import { injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';
import User from '@domain/user/entities/User';

import type {
  IClientsCredentialValidationService,
  ICredentialRequest,
  IValidatedCredential,
} from '@domain/clients/interfaces/services/IClientsCredentialValidationService';

@injectable()
class ClientsCredentialValidationService implements IClientsCredentialValidationService {
  validateCredentials(credential: ICredentialRequest): IValidatedCredential {
    const userId = User.validateUserId(credential.id);
    const validatedCredential = this.validateRole(credential);

    return { userId, credential: validatedCredential };
  }

  private validateRole(data: ICredentialRequest): ICredentialRequest {
    if (!data.client_id && !data.client_secret && !data.api_key) {
      throw new CustomError(401, ERROR_MESSAGES.NOT_FOUND.CREDENTIAL);
    }

    if (typeof data.client_id !== 'boolean') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.CLIENT_ID);
    }

    if (typeof data.client_secret !== 'boolean') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.CLIENT_SECRET);
    }

    if (typeof data.api_key !== 'boolean') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.FORMAT.API_KEY);
    }
    return data;
  }
}

export default ClientsCredentialValidationService;
