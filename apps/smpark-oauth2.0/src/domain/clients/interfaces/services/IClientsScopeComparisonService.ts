import {
  IFetchedScopes,
  ScopeResponse,
} from '@domain/clients/interfaces/services/IClientsScopeVerifierService';

export interface IClientsScopeComparisonService {
  validateAndCompareScopes(scopes: IFetchedScopes): ScopeResponse;
}
