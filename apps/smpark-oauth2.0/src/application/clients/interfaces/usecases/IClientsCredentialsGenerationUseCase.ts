export interface ICredentialRequest {
  id: string;
  client_id?: boolean;
  client_secret?: boolean;
  api_key?: boolean;
}

export interface ICredentialsResponse {
  client_id: string;
  client_secret: string;
  api_key: string;
}

export interface IClientsCredentialsGenerationUseCase {
  execute(credentialRequest: ICredentialRequest): Promise<ICredentialsResponse | null>;
}
