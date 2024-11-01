import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import type { IJsonWebTokenService } from '@domain/shared/interfaces/services/IJsonWebTokenService';

@injectable()
class JsonWebTokenService implements IJsonWebTokenService {
  generateToken(payload: object, jwtSecretKey: string, expiresIn: number): string {
    const jwtToken = jwt.sign(payload, jwtSecretKey, {
      expiresIn,
    });

    return jwtToken;
  }

  verifyTokenStrict<T>(token: string, jwtSecretKey: string): T {
    return jwt.verify(token, jwtSecretKey) as T;
  }

  verifyTokenIgnoreExpiration<T>(token: string, jwtSecretKey: string): T {
    return jwt.verify(token, jwtSecretKey, { ignoreExpiration: true }) as T;
  }

  calculateJwtExpiresAt(jwtExpiresIn: number): number {
    const currentTimestamp = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
    const jwtExpiresAt = currentTimestamp + jwtExpiresIn; // 만료 시점 계산
    return jwtExpiresAt;
  }
}

export default JsonWebTokenService;
