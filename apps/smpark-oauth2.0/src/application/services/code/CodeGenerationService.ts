import { inject, injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

import CodeMapper from '@mapper/CodeMapper';

import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { ICodeGenerationService } from '@application-interfaces/services/code/ICodeGenerationService';
import type { ICodeRepository } from '@domain-interfaces/infrastructure/repository/ICodeRepository';
import type { ICodeService } from '@domain-interfaces/services/ICodeService';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class CodeGenerationService implements ICodeGenerationService {
  constructor(
    @inject('env') private env: EnvConfig,
    @inject('ICodeRepository') private codeRepository: ICodeRepository,
    @inject('ICodeService') private codeDomainService: ICodeService,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
    @inject(CodeMapper) private codeMapper: CodeMapper,
  ) {}

  async generateCode(id?: string): Promise<string> {
    const verifiedId = this.oAuthVerifierService.verifyId(id);

    const code = uuidv4().substring(0, 15);
    const expiresAt = this.codeDomainService.calculateExpiryTime(
      Number(this.env.oauthCodeExpiresIn),
    );

    const codeDTO = this.codeMapper.toDTO(verifiedId, code, expiresAt);
    const isUpdated = await this.codeRepository.update(codeDTO);
    this.oAuthVerifierService.verifyOperation(isUpdated);

    return code;
  }
}
export default CodeGenerationService;
