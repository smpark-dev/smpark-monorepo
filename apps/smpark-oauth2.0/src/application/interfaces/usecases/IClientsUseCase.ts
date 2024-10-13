import {
  ClientsDTO,
  CredentialRequestDTO,
  CredentialResponseDTO,
  ClientsRequestDTO,
} from '@dtos/ClientsDTO';
import { AuthorizeRequestDTO, ScopeRequestDTO, ScopeResponseDTO } from '@dtos/OAuthDTO';

export interface IClientDetailsLoaderUseCase {
  execute(id?: string): Promise<ClientsDTO | null>;
}

export interface IClientDetailsRegistrationUseCase {
  execute(clientsData: ClientsRequestDTO): Promise<void>;
}

export interface IClientGenerationUseCase {
  execute(
    credentialRequest: CredentialRequestDTO,
    id?: string,
  ): Promise<CredentialResponseDTO | null>;
}

export interface IClientsScopeValidationUseCase {
  execute(requestScope: ScopeRequestDTO): Promise<ScopeResponseDTO>;
}

export interface IClientsRequestValidUseCase {
  execute(authorizeRequest: AuthorizeRequestDTO): Promise<string>;
}
