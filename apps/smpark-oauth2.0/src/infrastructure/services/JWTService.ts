import { injectable } from 'inversify';
import jwt from 'jsonwebtoken';

import type { ITokenManagementService } from '@domain-interfaces/infrastructure/services/ITokenManagementService';

@injectable()
class JWTService implements ITokenManagementService {
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
}
export default JWTService;
