import { ScopeRequestDTO } from '@dtos/OAuthDTO';

export interface IUserScopeUpdaterService {
  updateUserScope(scopeRequest: ScopeRequestDTO): Promise<void>;
}
