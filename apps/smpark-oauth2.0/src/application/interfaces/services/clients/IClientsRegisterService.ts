import { ClientsRequestDTO } from '@dtos/ClientsDTO';

export interface IClientsRegisterService {
  registerClient(clientsData: ClientsRequestDTO): Promise<void>;
}
