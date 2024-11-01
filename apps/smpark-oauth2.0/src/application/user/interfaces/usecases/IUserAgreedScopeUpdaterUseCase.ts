import { IScope } from '@domain/shared/value-objects/BaseScope';

export interface IAgreedScopeRequest {
  agreedScope: IScope;
  isUpdated: boolean;
  id: string;
}

export interface IUserAgreedScopeUpdaterUseCase {
  execute(agreedScopeRequest: IAgreedScopeRequest): Promise<void>;
}
