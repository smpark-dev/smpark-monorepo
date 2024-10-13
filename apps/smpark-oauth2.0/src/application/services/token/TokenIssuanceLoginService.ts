import { inject, injectable } from 'inversify';

import User from '@entities/User';

import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { ITokenIssuanceLoginService } from '@application-interfaces/services/token/ITokenIssuanceLoginService';
import type { IRedisTokenRepository } from '@domain-interfaces/infrastructure/repository/IRedisTokenRepository';
import type { ITokenManagementService } from '@domain-interfaces/infrastructure/services/ITokenManagementService';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class TokenIssuanceLoginService implements ITokenIssuanceLoginService {
  constructor(
    @inject('env') private env: EnvConfig,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
    @inject('ITokenManagementService') private tokenManagementService: ITokenManagementService,
    @inject('IRedisTokenRepository')
    private redisTokenRepository: IRedisTokenRepository,
  ) {}

  async issueLoginTokens(user: User, id: string): Promise<string> {
    const loginPayload = { id: user.id, name: user.name, email: user.email };
    const accessToken = this.tokenManagementService.generateToken(
      loginPayload,
      this.env.oauthAccessSecret,
      Number(this.env.oauthAccessTokenExpiresIn),
    );
    const refreshToken = this.tokenManagementService.generateToken(
      loginPayload,
      this.env.oauthRefreshSecret,
      Number(this.env.oauthRefreshTokenExpiresIn),
    );

    const tokenType = 'refresh';
    const isSave = await this.redisTokenRepository.save(
      tokenType,
      id,
      refreshToken,
      Number(this.env.oauthRefreshTokenExpiresIn),
    );

    this.oAuthVerifierService.verifyOperation(isSave);

    return accessToken;
  }
}

export default TokenIssuanceLoginService;
