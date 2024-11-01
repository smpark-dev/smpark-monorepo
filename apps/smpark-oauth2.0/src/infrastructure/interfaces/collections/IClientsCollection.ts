import { GrantTypeOptions } from '@domain/clients/value-objects/GrantType';

export interface IClientsCollection {
  client_id: string;
  client_secret: string;
  id: string;
  application_name: string;
  redirect_uri: string;
  address_uri: string;
  clientAllowedScopes?: { id: boolean; email: boolean; name: boolean };
  api_key?: string;
  grant_type?: GrantTypeOptions;
  manager_list?: string[];
}
