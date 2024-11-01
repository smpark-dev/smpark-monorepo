import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

type IScope = {
  id: boolean;
  email: boolean;
  name: boolean;
};
type GrantTypeOptions = 'authorization_code' | 'refresh_token';

export class ClientsRegistrationRequestDTO {
  id: string;
  application_name: string;
  redirect_uri: string;
  address_uri: string;
  clientAllowedScopes?: IScope;
  grant_type?: GrantTypeOptions;
  manager_list?: string[];

  constructor(clients: {
    id: string;
    application_name: string;
    redirect_uri: string;
    address_uri: string;
    clientAllowedScopes?: IScope;
    grant_type?: GrantTypeOptions;
    manager_list?: string[];
  }) {
    this.id = clients.id;
    this.application_name = clients.application_name;
    this.redirect_uri = clients.redirect_uri;
    this.address_uri = clients.address_uri;
    this.clientAllowedScopes = clients.clientAllowedScopes;
    this.grant_type = clients.grant_type;
    this.manager_list = clients.manager_list;

    if (!this.id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }
    if (!this.application_name) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.APPLICATION_NAME);
    }
    if (!this.redirect_uri) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI);
    }
    if (!this.address_uri) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ADDRESS_URI);
    }
  }
}
