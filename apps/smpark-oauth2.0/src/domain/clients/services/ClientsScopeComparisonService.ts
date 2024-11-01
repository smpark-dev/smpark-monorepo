import { injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { DEFAULT_SCOPE } from '@constants/scopes';
import Clients from '@domain/clients/entities/Clients';
import {
  IFetchedScopes,
  ScopeResponse,
} from '@domain/clients/interfaces/services/IClientsScopeVerifierService';
import { CustomError } from '@domain/shared/errors/CustomError';

import type { IClientsScopeComparisonService } from '@domain/clients/interfaces/services/IClientsScopeComparisonService';

@injectable()
class ClientsScopeComparisonService implements IClientsScopeComparisonService {
  validateAndCompareScopes(scopes: IFetchedScopes): ScopeResponse {
    const fetchedAllowedScope = scopes.allowedScopes?.getValue();
    const fetchedAgreedScopes = scopes.agreedScopes?.getValue();
    const { requestScopes } = scopes;

    if (!fetchedAllowedScope) {
      throw new CustomError(400, ERROR_MESSAGES.NOT_FOUND.SCOPE);
    }

    if (!requestScopes) {
      const defaultScope = Clients.createScope(DEFAULT_SCOPE);
      return {
        scope: DEFAULT_SCOPE,
        isUpdated: fetchedAgreedScopes
          ? !defaultScope.compareWithScope(DEFAULT_SCOPE, fetchedAgreedScopes)
          : true,
      };
    }

    const allowedScope = Clients.createAllowedScope(fetchedAllowedScope);
    const validatedScope = allowedScope.validateRequestedScope(requestScopes);
    const isUpdated = fetchedAgreedScopes
      ? !allowedScope.compareWithAgreedScope(Clients.createScope(fetchedAgreedScopes).getValue())
      : true;

    return { scope: validatedScope, isUpdated };
  }
}
export default ClientsScopeComparisonService;
