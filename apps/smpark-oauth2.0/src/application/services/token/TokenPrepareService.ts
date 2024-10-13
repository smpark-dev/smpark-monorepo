import { inject, injectable } from 'inversify';

import { TokenRequestDTO, ValidIdsDTO } from '@dtos/OAuthDTO';
import OAuthMapper from '@mapper/OAuthMapper';

import type { IClientsOAuthValidService } from '@application-interfaces/services/clients/IClientsOAuthValidService';
import type { IClientsVerifierService } from '@application-interfaces/services/clients/IClientsVerifierService';
import type { ICodeValidateService } from '@application-interfaces/services/code/ICodeValidateService';
import type { ITokenPrepareService } from '@application-interfaces/services/token/ITokenPrepareService';

@injectable()
class TokenPrepareService implements ITokenPrepareService {
  constructor(
    @inject(OAuthMapper) private oAuthMapper: OAuthMapper,
    @inject('IClientsOAuthValidService')
    private oAuthRequestValidService: IClientsOAuthValidService,
    @inject('ICodeValidateService') private codeValidateService: ICodeValidateService,
    @inject('IClientsVerifierService') private clientsVerifierService: IClientsVerifierService,
  ) {}

  async prepareToken(tokenRequest: TokenRequestDTO): Promise<ValidIdsDTO> {
    const validatedRequest = this.oAuthRequestValidService.validateTokenRequest(tokenRequest);
    const code = await this.codeValidateService.validateCode(validatedRequest);
    const client = await this.clientsVerifierService.validateClient(validatedRequest);

    const extendsClientCode = {
      client_id: client.client_id,
      client_secret: client.client_secret,
      code: code.code,
      redirect_uri: client.redirect_uri,
      grant_type: client.grant_type,
    };

    this.oAuthRequestValidService.validateTokenRequest(tokenRequest, extendsClientCode);

    return this.oAuthMapper.toTokenResponseDTO({
      id: code.id,
      client_id: client.client_id,
    });
  }
}

export default TokenPrepareService;
