import Clients, { ResponseType } from '@domain/clients/entities/Clients';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseURI from '@domain/shared/value-objects/BaseURI';

export interface IAuthorize {
  id?: string;
  client_id?: string;
  redirect_uri?: string;
  scope?: string;
  state?: string;
  response_type?: ResponseType;
}

export interface IVerifiedAuthorize {
  client_id: BaseClientId;
  redirect_uri: BaseURI;
  scope: string;
  state: string;
  response_type: ResponseType;
}

export interface IClientsAuthorizationValidationService {
  validateAuthorize(authorize: IAuthorize): Promise<Clients>;
}
