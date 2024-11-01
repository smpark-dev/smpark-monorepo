import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { DEFAULT_SCOPE } from '@constants/scopes';
import Clients from '@domain/clients/entities/Clients';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';
import BaseScope from '@domain/shared/value-objects/BaseScope';
import Token from '@domain/token/entities/Token';
import AuthToken from '@domain/token/value-objects/AuthToken';
import User from '@domain/user/entities/User';

import type { IEnvService } from '@domain/shared/interfaces/services/IEnvService';
import type { IJsonWebTokenService } from '@domain/shared/interfaces/services/IJsonWebTokenService';
import type { IUUIDv4Service } from '@domain/shared/interfaces/services/IUUIDv4Service';
import type { ITokenRepository } from '@domain/token/interfaces/repository/ITokenRepository';
import type {
  ITokenOAuthIssuanceService,
  ITokens,
} from '@domain/token/interfaces/services/ITokenOAuthIssuanceService';
import type { IUserRepository } from '@domain/user/interfaces/repository/IUserRepository';

@injectable()
class TokenOAuthIssuanceService implements ITokenOAuthIssuanceService {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IEnvService') private envService: IEnvService,
    @inject('IJsonWebTokenService') private jsonWebTokenService: IJsonWebTokenService,
    @inject('ITokenRepository') private tokenRepository: ITokenRepository,
    @inject('IUUIDv4Service') private uuidService: IUUIDv4Service,
  ) {}

  async issueOAuthToken(userId?: string, clientId?: string): Promise<ITokens> {
    const id = User.validateUserId(userId);
    const user = await this.fetchUser(id);
    const validatedClientId = Clients.validateClientsId(clientId);
    const agreedScopes = User.createScope(user.agreedScope?.getValue() || DEFAULT_SCOPE);

    const payload = {
      iss: this.envService.getIssuer(),
      sub: user.id.getValue(),
      aud: validatedClientId.getValue(),
      scope: agreedScopes.getValue(),
      name: user.name.getValue(),
    };

    const tokens = Token.generateToken(
      payload,
      Token.createOptions(this.envService),
      this.jsonWebTokenService,
    );

    await this.saveOrUpdateToken(id, tokens, agreedScopes);

    return tokens;
  }

  private async fetchUser(id: BaseId): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new CustomError(401, ERROR_MESSAGES.NOT_FOUND.USER);
    }

    return user;
  }

  private async saveOrUpdateToken(
    id: BaseId,
    tokens: { accessToken: AuthToken; refreshToken: AuthToken },
    agreedScope: BaseScope,
  ) {
    const token = Token.create({
      tokenId: this.uuidService.generate(),
      accessToken: tokens.accessToken.getValue(),
      refreshToken: tokens.refreshToken.getValue(),
      tokenGrantedScopes: agreedScope.getValue(),
    });

    const isUpserted = await this.tokenRepository.upsert(id, token);

    if (!isUpserted) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }
  }
}

export default TokenOAuthIssuanceService;
