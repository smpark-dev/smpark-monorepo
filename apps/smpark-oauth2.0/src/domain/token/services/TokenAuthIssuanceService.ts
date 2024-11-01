import { injectable, inject } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';
import Token from '@domain/token/entities/Token';
import AuthToken from '@domain/token/value-objects/AuthToken';
import User from '@domain/user/entities/User';

import type { IEnvService } from '@domain/shared/interfaces/services/IEnvService';
import type { IJsonWebTokenService } from '@domain/shared/interfaces/services/IJsonWebTokenService';
import type { ITokenRedisRepository } from '@domain/token/interfaces/repository/ITokenRedisRepository';
import type { ITokenAuthIssuanceService } from '@domain/token/interfaces/services/ITokenAuthIssuanceService';

@injectable()
class TokenAuthIssuanceService implements ITokenAuthIssuanceService {
  constructor(
    @inject('ITokenRedisRepository') private redisTokenRepository: ITokenRedisRepository,
    @inject('IEnvService') private envService: IEnvService,
    @inject('IJsonWebTokenService') private jsonWebTokenService: IJsonWebTokenService,
  ) {}

  async issueAuthToken(user: User): Promise<{
    accessToken: AuthToken;
    refreshToken: AuthToken;
  }> {
    const payload = {
      iss: this.envService.getIssuer(),
      sub: user.id.getValue(),
      name: user.name.getValue(),
    };

    const tokens = Token.generateToken(
      payload,
      Token.createOptions(this.envService),
      this.jsonWebTokenService,
    );

    await this.saveRedisToken(
      user.id,
      tokens.refreshToken,
      Number(this.envService.getOAuthRefreshTokenExpiresIn()),
    );

    return tokens;
  }

  private async saveRedisToken(id: BaseId, token: AuthToken, expiresIn: number): Promise<void> {
    const isSave = await this.redisTokenRepository.save(id, token, expiresIn);

    if (!isSave) {
      throw new CustomError(500, ERROR_MESSAGES.SERVER.ISSUE);
    }
  }
}

export default TokenAuthIssuanceService;
