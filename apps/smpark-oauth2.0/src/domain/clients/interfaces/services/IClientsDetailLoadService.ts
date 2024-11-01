import Clients from '@domain/clients/entities/Clients';

export interface IClientsDetailLoadService {
  loadClientDetail(id?: string): Promise<Clients | null>;
}
