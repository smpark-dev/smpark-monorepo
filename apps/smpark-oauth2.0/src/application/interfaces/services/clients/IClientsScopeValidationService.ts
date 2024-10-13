import { ScopeRequestDTO } from '@dtos/OAuthDTO';
import { ScopeDTO } from '@dtos/TokenDTO';

export interface IClientsScopeValidationService {
  validateScope(
    requestScope: ScopeRequestDTO,
  ): Promise<{ scope: Partial<ScopeDTO>; updated: boolean }>;
}
