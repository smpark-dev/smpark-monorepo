import { GrantTypeOptions } from '@domain/clients/value-objects/GrantType';
import { IScope } from '@domain/shared/value-objects/BaseScope';

export interface IClientsLoadResponse {
  client_id: string;
  client_secret: string;
  application_name: string;
  redirect_uri: string;
  address_uri: string;
  clientAllowedScopes?: IScope;
  grant_type?: GrantTypeOptions;
  api_key?: string;
  manager_list?: string[];
}

export interface IClientsDetailsLoaderUseCase {
  execute(id?: string): Promise<IClientsLoadResponse | null>;
}
