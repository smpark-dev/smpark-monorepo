import BaseScope from '@domain/shared/value-objects/BaseScope';

import type { IScope } from '@domain/shared/value-objects/BaseScope';

export interface IScopeRequest {
  id: string;
  client_id: string;
  scope?: string;
}

export interface ScopeResponse {
  scope: Partial<IScope>;
  isUpdated: boolean;
}

export interface IFetchedScopes {
  allowedScopes?: BaseScope;
  agreedScopes?: BaseScope;
  requestScopes?: string;
}

export interface IClientsScopeVerifierService {
  authorizeClientScope(scopeRequest: IScopeRequest): Promise<IFetchedScopes>;
}
