import { inject, injectable } from 'inversify';

import { DEFAULT_SCOPE } from '@constants/scopes';
import { ScopeRequestDTO, ScopeResponseDTO } from '@dtos/OAuthDTO';
import { ScopeDTO } from '@dtos/TokenDTO';
import OAuthMapper from '@mapper/OAuthMapper';
import { deepEqual } from '@utils/deepEqual';

import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { IClientsScopeValidationService } from '@application-interfaces/services/clients/IClientsScopeValidationService';
import type { IClientsRepository } from '@domain-interfaces/infrastructure/repository/IClientsRepository';
import type { IUserRepository } from '@domain-interfaces/infrastructure/repository/IUserRepository';
import type { ITokenService } from '@domain-interfaces/services/ITokenService';

@injectable()
class ClientsScopeValidationService implements IClientsScopeValidationService {
  constructor(
    @inject(OAuthMapper) private oAuthMapper: OAuthMapper,
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IClientsRepository') private clientsRepository: IClientsRepository,
    @inject('ITokenService') private tokenService: ITokenService,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
  ) {}

  async validateScope(
    requestScope: ScopeRequestDTO,
  ): Promise<{ scope: Partial<ScopeDTO>; updated: boolean }> {
    const { client_id, scope } = requestScope;
    const verifiedClientId = this.oAuthVerifierService.verifyClientId(client_id);
    const fetchedClients = await this.clientsRepository.findByClientId(verifiedClientId);
    const { id, clientAllowedScopes } = this.oAuthVerifierService.verifyClient(fetchedClients);
    const fetchedUser = await this.userRepository.findById(id);
    const { agreedScopes } = this.oAuthVerifierService.verifyUser(fetchedUser);

    return this.determineScope(scope, clientAllowedScopes, agreedScopes);
  }

  private determineScope(
    scope?: string,
    clientAllowedScopes?: ScopeDTO,
    agreedScopes?: ScopeDTO,
  ): ScopeResponseDTO {
    if (!clientAllowedScopes) {
      const defaultScope = DEFAULT_SCOPE;
      const isUpdated = false;
      return this.oAuthMapper.toScopeResponseDTO(defaultScope, isUpdated);
    }

    if (!scope) {
      const isUpdated = false;
      return this.oAuthMapper.toScopeResponseDTO(clientAllowedScopes, isUpdated);
    }

    const resultScope = this.tokenService.validateScope(clientAllowedScopes, scope);
    const isEqual = this.compareScope(resultScope, agreedScopes);
    const isUpdated = !isEqual;
    return this.oAuthMapper.toScopeResponseDTO(resultScope, isUpdated);
  }

  private compareScope(newScope: Partial<ScopeDTO>, agreedScopes?: ScopeDTO): boolean {
    return agreedScopes ? deepEqual(newScope, agreedScopes) : false;
  }
}

export default ClientsScopeValidationService;
