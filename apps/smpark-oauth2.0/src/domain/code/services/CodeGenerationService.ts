import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Clients from '@domain/clients/entities/Clients';
import Code from '@domain/code/entities/Code';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseId from '@domain/shared/value-objects/BaseId';
import User from '@domain/user/entities/User';

import type { IClientsRepository } from '@domain/clients/repository/IClientsRepository';
import type { ICodeRepository } from '@domain/code/interfaces/repository/ICodeRepository';
import type {
  ICodeGenerationService,
  ICodeRequest,
} from '@domain/code/interfaces/services/ICodeGenerationService';
import type { IEnvService } from '@domain/shared/interfaces/services/IEnvService';
import type { IUUIDv4Service } from '@domain/shared/interfaces/services/IUUIDv4Service';

@injectable()
class CodeGenerationService implements ICodeGenerationService {
  constructor(
    @inject('IUUIDv4Service') private uuidV4Service: IUUIDv4Service,
    @inject('IEnvService') private envService: IEnvService,
    @inject('ICodeRepository') private codeRepository: ICodeRepository,
    @inject('IClientsRepository') private clientsRepository: IClientsRepository,
  ) {}

  async generateCode(codeRequest: ICodeRequest): Promise<Code> {
    const { id, redirect_uri, client_id } = codeRequest;

    const userId = User.validateUserId(id);
    const clientId = Clients.validateClientsId(client_id);
    const authorizeCode = Code.createAuthorizeCode(this.uuidV4Service).getValue();
    const expiresAt = Code.calculateExpiryTime(Number(this.envService.getOAuthCodeExpiresIn()));
    const code = Code.create(authorizeCode, clientId.getValue(), expiresAt, redirect_uri);
    await this.updateCode(code, userId, clientId);

    return code;
  }

  private async updateCode(code: Code, userId: BaseId, clientId: BaseClientId) {
    const updated = await this.codeRepository.update(code, userId, clientId);
    if (!updated) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }
  }
}
export default CodeGenerationService;
