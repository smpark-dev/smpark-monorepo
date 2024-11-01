import Clients from '@domain/clients/entities/Clients';

import type { ICredentialRequest } from '@domain/clients/interfaces/services/IClientsCredentialValidationService';

export interface ICredentialResponse {
  client_id: string;
  client_secret: string;
  api_key: string;
}

export interface IClientsCredentialGenerationService {
  generateCredentials(credential: ICredentialRequest): Promise<Clients>;
}
