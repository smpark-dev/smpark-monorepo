import {
  AuthorizeRequestDTO,
  TokenRequestDTO,
  ScopeRequestDTO,
  ScopeResponseDTO,
  ValidIdsDTO,
} from '@dtos/OAuthDTO';

export interface ICodeGenerationUseCase {
  execute(id?: string): Promise<string>;
}

export interface IScopeComparatorUseCase {
  execute(requestScope: ScopeRequestDTO): Promise<ScopeResponseDTO>;
}

export interface ITokenPreparationUseCase {
  execute(tokenRequest: TokenRequestDTO): Promise<ValidIdsDTO>;
}

export interface IUserAuthorizationUseCase {
  execute(authorizeRequest: AuthorizeRequestDTO): Promise<string>;
}

export interface IUserScopeUpdaterUseCase {
  execute(scopeRequest: ScopeRequestDTO): Promise<void>;
}
