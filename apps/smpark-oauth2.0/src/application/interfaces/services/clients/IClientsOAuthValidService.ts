import { RequestValidDTO, ResponseValidDTO } from '@dtos/ClientsDTO';
import { AuthorizeRequestDTO, TokenRequestDTO, TokenValidateDTO } from '@dtos/OAuthDTO';

export interface IClientsOAuthValidService {
  validateAuthorizationRequest(
    request: AuthorizeRequestDTO,
    clients?: RequestValidDTO | null,
  ): ResponseValidDTO;

  validateTokenRequest(request: TokenRequestDTO, oauth?: TokenRequestDTO | null): TokenValidateDTO;
}
