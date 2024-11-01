import { inject, injectable } from 'inversify';
import { JwtPayload } from 'jsonwebtoken';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { REISSUE_STATE } from '@constants/token';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';
import User from '@domain/user/entities/User';

import type { IEnvService } from '@domain/shared/interfaces/services/IEnvService';
import type { IJsonWebTokenService } from '@domain/shared/interfaces/services/IJsonWebTokenService';
import type { ITokenRedisRepository } from '@domain/token/interfaces/repository/ITokenRedisRepository';
import type { ITokenAuthIssuanceService } from '@domain/token/interfaces/services/ITokenAuthIssuanceService';
import type {
  ITokenReissueService,
  IReissueTokenResult,
  IAccessTokenValidation,
  IRefreshTokenValidation,
} from '@domain/token/interfaces/services/ITokenReissueService';
import type { ITokenPayload } from '@domain/token/value-objects/AuthToken';
import type { IUserRepository } from '@domain/user/interfaces/repository/IUserRepository';

@injectable()
class TokenReissueService implements ITokenReissueService {
  constructor(
    @inject('IJsonWebTokenService') private jsonWebTokenService: IJsonWebTokenService,
    @inject('IEnvService') private envService: IEnvService,
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('ITokenAuthIssuanceService')
    private tokenAuthIssuanceService: ITokenAuthIssuanceService,
    @inject('ITokenRedisRepository')
    private tokenRedisRepository: ITokenRedisRepository,
  ) {}

  async reissueToken(accessToken: string): Promise<IReissueTokenResult> {
    const accessTokenValidation = await this.validateAccessToken(accessToken);
    if (!accessTokenValidation.isExpired) {
      return {
        state: REISSUE_STATE.PASS,
        data: { accessToken, userId: accessTokenValidation.userId },
      };
    }

    const user = await this.validateAndFetchUser(accessTokenValidation.userId);

    const refreshTokenValidation = await this.validateRefreshToken(user.id);
    if (!refreshTokenValidation || refreshTokenValidation.isExpired) {
      return {
        state: REISSUE_STATE.FAIL,
        data: null,
      };
    }

    const tokens = await this.tokenAuthIssuanceService.issueAuthToken(user);
    return {
      state: REISSUE_STATE.UPDATE,
      data: {
        accessToken: tokens.accessToken.getValue(),
        userId: user.id.getValue(),
      },
    };
  }

  private async validateAccessToken(token: string): Promise<IAccessTokenValidation> {
    const decoded = this.jsonWebTokenService.verifyTokenIgnoreExpiration<
      ITokenPayload & JwtPayload
    >(token, this.envService.getOAuthAccessSecret());

    return {
      isExpired: this.isTokenExpired(decoded.exp),
      userId: decoded.sub,
    };
  }

  private async validateRefreshToken(userId: BaseId): Promise<IRefreshTokenValidation | null> {
    const token = await this.tokenRedisRepository.find(userId);
    if (!token) return null;

    const decoded = this.jsonWebTokenService.verifyTokenIgnoreExpiration<
      ITokenPayload & JwtPayload
    >(token, this.envService.getOAuthRefreshSecret());

    return {
      isExpired: this.isTokenExpired(decoded.exp),
      token,
    };
  }

  private async validateAndFetchUser(id?: string): Promise<User> {
    const userId = User.validateUserId(id);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new CustomError(400, ERROR_MESSAGES.NOT_FOUND.USER);
    }

    return user;
  }

  private isTokenExpired(exp?: number): boolean {
    if (!exp) return true;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return exp <= currentTimestamp;
  }
}
export default TokenReissueService;
