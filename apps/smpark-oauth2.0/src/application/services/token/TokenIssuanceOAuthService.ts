import { inject, injectable } from 'inversify';

import { DEFAULT_SCOPE } from '@constants/scopes';
import { ValidIdsDTO } from '@dtos/OAuthDTO';
import { ScopeDTO, TokenResponseDTO } from '@dtos/TokenDTO';
import { UserDTO } from '@dtos/UserDTO';
import TokenMapper from '@mapper/TokenMapper';

import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { ITokenIssuanceOAuthService } from '@application-interfaces/services/token/ITokenIssuanceOAuthService';
import type { ICodeRepository } from '@domain-interfaces/infrastructure/repository/ICodeRepository';
import type { IMongoTokenRepository } from '@domain-interfaces/infrastructure/repository/IMongoTokenRepository';
import type { IUserRepository } from '@domain-interfaces/infrastructure/repository/IUserRepository';
import type { ITokenManagementService } from '@domain-interfaces/infrastructure/services/ITokenManagementService';
import type { ITokenService } from '@domain-interfaces/services/ITokenService';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class TokenIssuanceOAuthService implements ITokenIssuanceOAuthService {
  constructor(
    @inject('env') private env: EnvConfig,
    @inject(TokenMapper) private tokenMapper: TokenMapper,
    @inject('ITokenService') public tokenService: ITokenService,
    @inject('IMongoTokenRepository') public tokenRepository: IMongoTokenRepository,
    @inject('IUserRepository') public userRepository: IUserRepository,
    @inject('ICodeRepository') public codeRepository: ICodeRepository,
    @inject('ITokenManagementService') private tokenManagementService: ITokenManagementService,
    @inject('IClientsOAuthVerifierService')
    public oAuthVerifierService: IClientsOAuthVerifierService,
  ) {}

  async issueOauthToken(ids?: ValidIdsDTO | null): Promise<TokenResponseDTO> {
    const { id, client_id } = this.oAuthVerifierService.verifyIds(ids);
    const user = await this.getUser(id);
    const agreedScopes = user.agreedScopes || DEFAULT_SCOPE;
    const verifiedScopes = this.oAuthVerifierService.verifyAgreedScopes(agreedScopes);

    const accessTokenPayload = {
      iss: this.env.issuer,
      sub: user.id,
      name: user.name,
      aud: client_id,
      scope: verifiedScopes,
    };
    const refreshTokenPayload = {
      iss: this.env.issuer,
      sub: user.id,
      aud: client_id,
      scope: verifiedScopes,
    };

    const tokens = {
      accessToken: this.tokenManagementService.generateToken(
        accessTokenPayload,
        this.env.oauthAccessSecret,
        Number(this.env.oauthAccessTokenExpiresIn),
      ),
      refreshToken: this.tokenManagementService.generateToken(
        refreshTokenPayload,
        this.env.oauthRefreshSecret,
        Number(this.env.oauthRefreshTokenExpiresIn),
      ),
    };

    await this.saveOrUpdateToken(id, tokens, verifiedScopes);
    await this.codeRepository.delete(id);
    return this.tokenMapper.toTokenResponseDTO(tokens);
  }

  private async getUser(id: string): Promise<UserDTO> {
    const user = await this.userRepository.findById(id);
    return this.oAuthVerifierService.verifyUser(user);
  }

  private async saveOrUpdateToken(
    id: string,
    tokens: { accessToken: string; refreshToken: string },
    verifiedScopes: ScopeDTO,
  ): Promise<void> {
    const jwtExpiresIn = Number(this.env.oauthAccessTokenExpiresIn);
    const token = {
      id,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      tokenGrantedScopes: verifiedScopes,
      expiresAt: this.tokenService.calculateJwtExpiresAt(jwtExpiresIn),
    };
    const isUpserted = await this.tokenRepository.upsert(token);
    this.oAuthVerifierService.verifyOperation(isUpserted);
  }
}

export default TokenIssuanceOAuthService;
