import type { ResponseType } from '@domain/clients/entities/Clients';

export interface IAuthorizeRequest {
  id?: string;
  client_id?: string;
  redirect_uri?: string;
  scope?: string;
  state?: string;
  response_type?: ResponseType;
}

export interface IClientsAuthorizationVerifierUseCase {
  execute(authorizeRequest: IAuthorizeRequest): Promise<string>;
}
