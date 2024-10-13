import { ClientsDTO } from '@dtos/ClientsDTO';

export interface IClientsLoadService {
  loadClient(id?: string): Promise<ClientsDTO | null>;
}
