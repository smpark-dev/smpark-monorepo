import createError from 'http-errors';
import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { ClientsRequestDTO, ClientsDTO } from '@dtos/ClientsDTO';
import Clients from '@entities/Clients';
import ClientsMapper from '@mapper/ClientsMapper';

import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { IClientsRegisterService } from '@application-interfaces/services/clients/IClientsRegisterService';
import type { IClientsRepository } from '@domain-interfaces/infrastructure/repository/IClientsRepository';
import type { IClientService } from '@domain-interfaces/services/IClientService';

@injectable()
class ClientsRegisterService implements IClientsRegisterService {
  constructor(
    @inject('IClientsRepository') public clientsRepository: IClientsRepository,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
    @inject('IClientService') private userValidationService: IClientService,
    @inject(ClientsMapper) private clientsMapper: ClientsMapper,
  ) {}

  async registerClient(clientsData: ClientsRequestDTO): Promise<void> {
    const verifiedClients = this.verifyClientsDetail(clientsData);
    const clientsEntity = this.clientsMapper.toEntity(verifiedClients);
    this.validClientsDetail(clientsEntity);
    const {
      client_id: _client_id,
      client_secret: _client_secret,
      api_key: _api_key,
      ...clientDetail
    } = verifiedClients;

    const isSave = await this.clientsRepository.save(clientDetail);
    this.oAuthVerifierService.verifyOperation(isSave);
  }

  private validClientsDetail(clients: Clients): void {
    if (!this.userValidationService.isValidURI(clients.address_uri)) {
      throw createError(422, ERROR_MESSAGES.VALIDATION.FORMAT.ADDRESS_URI);
    }

    if (!this.userValidationService.isValidURI(clients.redirect_uri)) {
      throw createError(422, ERROR_MESSAGES.VALIDATION.FORMAT.REDIRECT_URI);
    }
  }

  private verifyClientsDetail(clientsRequestDTO: ClientsRequestDTO): ClientsDTO {
    const {
      id,
      client_id,
      client_secret,
      address_uri,
      redirect_uri,
      clientAllowedScopes,
      application_name,
      manager_list,
    } = clientsRequestDTO;

    if (!id) {
      throw createError(401, ERROR_MESSAGES.NOT_FOUND.USER);
    }

    if (!client_id) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID);
    }

    if (!client_secret) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_SECRET);
    }

    if (!address_uri) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.ADDRESS_URI);
    }

    if (!redirect_uri) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI);
    }

    if (!clientAllowedScopes) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.SCOPE);
    }

    if (!application_name) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.APPLICATION_NAME);
    }

    return {
      id,
      client_id,
      client_secret,
      address_uri,
      redirect_uri,
      clientAllowedScopes,
      application_name,
      manager_list,
    };
  }
}

export default ClientsRegisterService;
