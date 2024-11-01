import { GrantTypeOptions } from '@domain/clients/value-objects/GrantType';

export interface IClientsDetails {
  id?: string;
  application_name?: string;
  redirect_uri?: string;
  address_uri?: string;
  clientAllowedScopes?: { id: boolean; email: boolean; name: boolean };
  grant_type?: GrantTypeOptions;
  manager_list?: string[];
}

export interface IClientsDetailRegistrationService {
  registerClientDetail(clientsDetails: IClientsDetails): Promise<void>;
}
