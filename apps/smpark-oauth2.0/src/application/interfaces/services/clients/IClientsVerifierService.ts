import { ClientsDTO } from '@dtos/ClientsDTO';
import { TokenValidateDTO } from '@dtos/OAuthDTO';

export interface IClientsVerifierService {
  validateClient(validatedRequest: TokenValidateDTO): Promise<ClientsDTO>;
}
