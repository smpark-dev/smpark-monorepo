import { CredentialRequestDTO, CredentialResponseDTO } from '@dtos/ClientsDTO';

export interface IClientsGenerationService {
  generateClient(credentialRequest: CredentialRequestDTO): Promise<CredentialResponseDTO | null>;
}
