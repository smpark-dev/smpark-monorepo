import BaseId from '@domain/shared/value-objects/BaseId';

export interface ICredentialRequest {
  id?: string;
  client_id?: boolean;
  client_secret?: boolean;
  api_key?: boolean;
}

export interface IValidatedCredential {
  userId: BaseId;
  credential: ICredentialRequest;
}

export interface IClientsCredentialValidationService {
  validateCredentials(credential: ICredentialRequest): IValidatedCredential;
}
