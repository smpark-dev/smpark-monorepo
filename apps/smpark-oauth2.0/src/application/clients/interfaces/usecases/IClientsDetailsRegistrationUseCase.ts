import type { GrantTypeOptions } from '@domain/clients/value-objects/GrantType';

export interface IClientsDetailsRequest {
  id?: string;
  application_name?: string;
  redirect_uri?: string;
  address_uri?: string;
  clientAllowedScopes?: { id: boolean; email: boolean; name: boolean };
  grant_type?: GrantTypeOptions;
  manager_list?: string[];
}

export interface IClientsDetailsRegistrationUseCase {
  execute(clientsData: IClientsDetailsRequest): Promise<void>;
}
