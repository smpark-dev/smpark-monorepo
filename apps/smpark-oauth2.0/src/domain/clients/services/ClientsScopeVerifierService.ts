import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Clients from '@domain/clients/entities/Clients';
import { CustomError } from '@domain/shared/errors/CustomError';
import User from '@domain/user/entities/User';

import type {
  IClientsScopeVerifierService,
  IFetchedScopes,
  IScopeRequest,
} from '@domain/clients/interfaces/services/IClientsScopeVerifierService';
import type { IClientsRepository } from '@domain/clients/repository/IClientsRepository';
import type { IUserRepository } from '@domain/user/interfaces/repository/IUserRepository';

@injectable()
class ClientsScopeVerifierService implements IClientsScopeVerifierService {
  constructor(
    @inject('IClientsRepository') private clientsRepository: IClientsRepository,
    @inject('IUserRepository') private userRepository: IUserRepository,
  ) {}

  async authorizeClientScope(scopeRequest: IScopeRequest): Promise<IFetchedScopes> {
    const clients = await this.fetchAndValidateClient(scopeRequest.client_id);
    const user = await this.fetchAndValidateUser(scopeRequest.id);

    return {
      allowedScopes: clients.clientAllowedScopes,
      agreedScopes: user.agreedScope,
      requestScopes: scopeRequest?.scope,
    };
  }

  private async fetchAndValidateClient(requestClientId?: string) {
    const clientId = Clients.validateClientsId(requestClientId);
    const client = await this.clientsRepository.findByClientId(clientId);

    if (!client) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID);
    }
    return client;
  }

  private async fetchAndValidateUser(id: string) {
    const userId = User.validateUserId(id);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new CustomError(500, ERROR_MESSAGES.LOGIN.REQUIRED);
    }
    return user;
  }
}
export default ClientsScopeVerifierService;
