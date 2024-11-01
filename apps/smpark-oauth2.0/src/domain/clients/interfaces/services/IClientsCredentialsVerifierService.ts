import Clients from '@domain/clients/entities/Clients';

export interface ICredential {
  client_id: string;
  client_secret: string;
}

export interface IClientsCredentialsVerifierService {
  validateClient(credentialRequest: ICredential): Promise<Clients>;
}
