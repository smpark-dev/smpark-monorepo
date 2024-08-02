import { injectable, inject } from 'inversify';

import { IClientDetailsLoaderUseCase } from '@application-interfaces/usecases/IClientsUseCase';
import { ClientsDTO } from '@dtos/ClientsDTO';

import type { IClientsRepository } from '@domain-interfaces/repository/IClientsRepository';
import type { IOAuthVerifierService } from '@domain-interfaces/services/IOAuthVerifierService';

@injectable()
class ClientDetailsLoaderUseCase implements IClientDetailsLoaderUseCase {
  constructor(
    @inject('IClientsRepository') private clientsRepository: IClientsRepository,
    @inject('IOAuthVerifierService') private oAuthVerifierService: IOAuthVerifierService,
  ) {}

  async execute(id?: string): Promise<ClientsDTO | null> {
    const verifiedId = this.oAuthVerifierService.verifyId(id);

    const fetchedClients = await this.clientsRepository.findById(verifiedId);

    return fetchedClients;
  }
}

export default ClientDetailsLoaderUseCase;
