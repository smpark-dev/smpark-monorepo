import type { IScope } from '@domain/shared/value-objects/BaseScope';

export interface IScopeRequest {
  id: string;
  client_id: string;
  scope?: string;
}

export interface IScopeResponse {
  scope: Partial<IScope>;
  isUpdated: boolean;
}
export interface IClientsScopeComparisonUseCase {
  execute(requestScope: IScopeRequest): Promise<IScopeResponse>;
}
