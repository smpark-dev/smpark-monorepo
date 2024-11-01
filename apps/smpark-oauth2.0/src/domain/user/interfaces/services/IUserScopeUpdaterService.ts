import { IScope } from '@domain/shared/value-objects/BaseScope';

export interface IAgreedScopeUpdate {
  id: string;
  agreedScope: IScope;
  isUpdated: boolean;
}

export interface IUserScopeUpdaterService {
  updateAgreedScope(agreedScopeRequest: IAgreedScopeUpdate): Promise<void>;
}
