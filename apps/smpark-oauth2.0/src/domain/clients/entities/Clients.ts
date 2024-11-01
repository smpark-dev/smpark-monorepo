import { IVerifiedAuthorize } from '@domain/clients/interfaces/services/IClientsAuthorizationValidationService';
import AllowedScope from '@domain/clients/value-objects/AllowedScope';
import ApplicationName from '@domain/clients/value-objects/ApplicationName';
import ClientSecret from '@domain/clients/value-objects/ClientSecret';
import GrantType, { GrantTypeOptions } from '@domain/clients/value-objects/GrantType';
import ManagerList from '@domain/clients/value-objects/ManagerList';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseScope, { IScope } from '@domain/shared/value-objects/BaseScope';
import BaseURI from '@domain/shared/value-objects/BaseURI';

export type ResponseType = 'code' | 'token';

class Clients {
  #client_id: BaseClientId;
  #client_secret: ClientSecret;
  #application_name: ApplicationName;
  #redirect_uri: BaseURI;
  #address_uri: BaseURI;
  #clientAllowedScopes?: AllowedScope;
  #grant_type?: GrantType;
  #api_key?: string;
  #manager_list?: ManagerList;

  constructor(
    client_id: BaseClientId,
    client_secret: ClientSecret,
    application_name: ApplicationName,
    redirect_uri: BaseURI,
    address_uri: BaseURI,
    clientAllowedScopes?: AllowedScope,
    grant_type?: GrantType,
    api_key?: string,
    manager_list?: ManagerList,
  ) {
    this.#client_id = client_id;
    this.#client_secret = client_secret;
    this.#application_name = application_name;
    this.#redirect_uri = redirect_uri;
    this.#address_uri = address_uri;
    this.#clientAllowedScopes = clientAllowedScopes;
    this.#grant_type = grant_type;
    this.#api_key = api_key;
    this.#manager_list = manager_list;
  }

  get client_id(): BaseClientId {
    return this.#client_id;
  }

  get client_secret(): ClientSecret {
    return this.#client_secret;
  }

  get application_name(): ApplicationName {
    return this.#application_name;
  }

  get redirect_uri(): BaseURI {
    return this.#redirect_uri;
  }

  get address_uri(): BaseURI {
    return this.#address_uri;
  }

  get clientAllowedScopes(): BaseScope | undefined {
    return this.#clientAllowedScopes;
  }

  get grant_type(): GrantType | undefined {
    return this.#grant_type;
  }

  get api_key(): string | undefined {
    return this.#api_key;
  }

  get manager_list(): ManagerList | undefined {
    return this.#manager_list;
  }

  static create(client: {
    client_id?: string;
    client_secret?: string;
    application_name?: string;
    redirect_uri?: string;
    address_uri?: string;
    clientAllowedScopes?: IScope;
    grant_type?: GrantTypeOptions;
    api_key?: string;
    manager_list?: string[];
  }): Clients {
    return new Clients(
      new BaseClientId(client.client_id),
      new ClientSecret(client.client_secret),
      new ApplicationName(client.application_name),
      new BaseURI(client.redirect_uri),
      new BaseURI(client.address_uri),
      client?.clientAllowedScopes ? new AllowedScope(client.clientAllowedScopes) : undefined,
      client?.grant_type ? new GrantType(client.grant_type) : undefined,
      client?.api_key || undefined,
      client?.manager_list ? new ManagerList(client.manager_list) : undefined,
    );
  }

  static validateClientsId(clientId?: string): BaseClientId {
    return BaseClientId.validate(clientId);
  }

  static validateCredential(data: { client_id?: string; client_secret?: string }): {
    clientId: BaseClientId;
    clientSecret: ClientSecret;
  } {
    return {
      clientId: BaseClientId.validate(data.client_id),
      clientSecret: ClientSecret.validate(data.client_secret),
    };
  }

  static createAllowedScope(scope: IScope): AllowedScope {
    return new AllowedScope(scope);
  }

  static createScope(scope: IScope): BaseScope {
    return new BaseScope(scope);
  }

  static validateAuthorize(
    client_id?: string,
    redirect_uri?: string,
    scope?: string,
    state?: string,
    response_type?: ResponseType,
  ): IVerifiedAuthorize {
    return {
      client_id: BaseClientId.validate(client_id),
      redirect_uri: BaseURI.validate(redirect_uri, 'REDIRECT_URI'),
      scope: scope || '',
      state: state || '',
      response_type: response_type || 'code',
    };
  }
}

export default Clients;
