import { injectable, inject } from 'inversify';

import type {
  IClientsScopeComparisonUseCase,
  IScopeRequest,
  IScopeResponse,
} from '@application/clients/interfaces/usecases/IClientsScopeComparisonUseCase';
import type { IClientsScopeComparisonService } from '@domain/clients/interfaces/services/IClientsScopeComparisonService';
import type { IClientsScopeVerifierService } from '@domain/clients/interfaces/services/IClientsScopeVerifierService';

@injectable()
class ClientsScopeComparisonUseCase implements IClientsScopeComparisonUseCase {
  constructor(
    @inject('IClientsScopeVerifierService')
    private clientsScopeVerifierService: IClientsScopeVerifierService,
    @inject('IClientsScopeComparisonService')
    private clientsScopeComparisonService: IClientsScopeComparisonService,
  ) {}

  async execute(requestScope: IScopeRequest): Promise<IScopeResponse> {
    const scopes = await this.clientsScopeVerifierService.authorizeClientScope(requestScope);

    return this.clientsScopeComparisonService.validateAndCompareScopes(scopes);
  }
}

export default ClientsScopeComparisonUseCase;
