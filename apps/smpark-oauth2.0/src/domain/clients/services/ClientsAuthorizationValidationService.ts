import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Clients from '@domain/clients/entities/Clients';
import { CustomError } from '@domain/shared/errors/CustomError';
import User from '@domain/user/entities/User';

import type {
  IAuthorize,
  IClientsAuthorizationValidationService,
} from '@domain/clients/interfaces/services/IClientsAuthorizationValidationService';
import type { IClientsRepository } from '@domain/clients/repository/IClientsRepository';

@injectable()
class ClientsAuthorizationValidationService implements IClientsAuthorizationValidationService {
  constructor(@inject('IClientsRepository') private clientsRepository: IClientsRepository) {}

  async validateAuthorize(authorize: IAuthorize): Promise<Clients> {
    User.validateUserId(authorize.id);
    const validatedAuthorize = Clients.validateAuthorize(
      authorize.client_id,
      authorize.redirect_uri,
      authorize.scope,
      authorize.state,
      authorize.response_type,
    );

    const clients = await this.clientsRepository.findByClientId(validatedAuthorize.client_id);

    if (!clients) {
      throw new CustomError(401, ERROR_MESSAGES.NOT_FOUND.CLIENT_ID);
    }

    if (validatedAuthorize.client_id.getValue() !== clients?.client_id.getValue()) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISMATCH.CLIENT_ID);
    }

    if (validatedAuthorize.redirect_uri.getValue() !== clients?.redirect_uri.getValue()) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISMATCH.REDIRECT_URI);
    }

    return clients;
  }
}
export default ClientsAuthorizationValidationService;
