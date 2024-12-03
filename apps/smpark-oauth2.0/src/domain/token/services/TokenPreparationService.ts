import { inject, injectable } from 'inversify';
import { JwtPayload } from 'jsonwebtoken';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Clients from '@domain/clients/entities/Clients';
import Code from '@domain/code/entities/Code';
import { CustomError } from '@domain/shared/errors/CustomError';
import BaseId from '@domain/shared/value-objects/BaseId';
import Token from '@domain/token/entities/Token';

import type { IEnvService } from '@domain/shared/interfaces/services/IEnvService';
import type { IJsonWebTokenService } from '@domain/shared/interfaces/services/IJsonWebTokenService';
import type { ITokenRepository } from '@domain/token/interfaces/repository/ITokenRepository';
import type {
  ITokenPreparationService,
  ITokenPrepare,
} from '@domain/token/interfaces/services/ITokenPreparationService';
import type { ITokenPayload } from '@domain/token/value-objects/AuthToken';

@injectable()
class TokenPreparationService implements ITokenPreparationService {
  constructor(
    @inject('IJsonWebTokenService') private jsonWebTokenService: IJsonWebTokenService,
    @inject('IEnvService') private envService: IEnvService,
    @inject('ITokenRepository') private tokenRepository: ITokenRepository,
  ) {}

  prepareToken(tokenPrepare: ITokenPrepare, code: Code, clients: Clients) {
    if (tokenPrepare.client_id !== code.clientId.getValue()) {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.CLIENT_ID);
    }

    if (tokenPrepare.redirect_uri !== clients.redirect_uri.getValue()) {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.REDIRECT_URI);
    }
  }

  async validateRefreshToken(refreshToken?: string): Promise<BaseId> {
    const token = Token.validateToken(refreshToken).getValue();
    const userId = await this.tokenRepository.findByRefreshToken(token);

    if (!userId) {
      throw new CustomError(400, ERROR_MESSAGES.NOT_FOUND.TOKEN);
    }

    const decoded = this.jsonWebTokenService.verifyTokenIgnoreExpiration<
      ITokenPayload & JwtPayload
    >(token, this.envService.getOAuthRefreshSecret());

    const isExpired = this.isTokenExpired(decoded.exp);
    if (isExpired) {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.EXPIRED.TOKEN);
    }

    return userId;
  }

  private isTokenExpired(exp?: number): boolean {
    if (!exp) return true;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    return exp <= currentTimestamp;
  }
}

export default TokenPreparationService;
