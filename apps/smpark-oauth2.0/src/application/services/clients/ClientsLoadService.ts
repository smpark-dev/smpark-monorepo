import { inject, injectable } from 'inversify';

import { ClientsDTO } from '@dtos/ClientsDTO';

import type { IClientsLoadService } from '@application-interfaces/services/clients/IClientsLoadService';
import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { IClientsRepository } from '@domain-interfaces/infrastructure/repository/IClientsRepository';

@injectable()
class ClientsLoadService implements IClientsLoadService {
  constructor(
    @inject('IClientsRepository') public clientsRepository: IClientsRepository,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
  ) {}

  async loadClient(id?: string): Promise<ClientsDTO | null> {
    const verifiedId = this.oAuthVerifierService.verifyId(id);

    const fetchedClients = await this.clientsRepository.findById(verifiedId);

    return fetchedClients;
  }
}

export default ClientsLoadService;
