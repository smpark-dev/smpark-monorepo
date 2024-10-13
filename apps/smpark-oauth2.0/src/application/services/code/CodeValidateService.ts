import { inject, injectable } from 'inversify';

import { CodeDTO } from '@dtos/CodeDTO';
import { TokenValidateDTO } from '@dtos/OAuthDTO';

import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { ICodeValidateService } from '@application-interfaces/services/code/ICodeValidateService';
import type { ICodeRepository } from '@domain-interfaces/infrastructure/repository/ICodeRepository';
import type { ICodeService } from '@domain-interfaces/services/ICodeService';

@injectable()
class CodeValidateService implements ICodeValidateService {
  constructor(
    @inject('ICodeRepository') private codeRepository: ICodeRepository,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
    @inject('ICodeService') private codeService: ICodeService,
  ) {}

  async validateCode(validatedRequest: TokenValidateDTO): Promise<CodeDTO> {
    const code = await this.getCode(validatedRequest.code);
    const isExpired = this.codeService.validateCodeExpiresAt(code.expiresAt);
    await this.deleteCode(code.id, isExpired);
    this.oAuthVerifierService.verifyCodeExpiration(isExpired);

    return code;
  }

  private async getCode(code: string): Promise<CodeDTO> {
    const fetchedCode = await this.codeRepository.findByCode(code);

    const verifiedCode = this.oAuthVerifierService.verifyCodeExists(fetchedCode);

    return verifiedCode;
  }

  private async deleteCode(id: string, isExpired: boolean): Promise<void> {
    if (isExpired) {
      await this.codeRepository.delete(id);
    }
  }
}
export default CodeValidateService;
