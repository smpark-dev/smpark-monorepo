import { AuthorizeRequestDTO } from '@dtos/OAuthDTO';

export interface IClientsOAuthRequestValidService {
  validateRequestOAuth(authorizeRequest: AuthorizeRequestDTO): Promise<string>;
}
