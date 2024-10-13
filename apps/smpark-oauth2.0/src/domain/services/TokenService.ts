import { injectable } from 'inversify';

import { ScopeDTO } from '@dtos/TokenDTO';

import type { ITokenService } from '@domain-interfaces/services/ITokenService';

@injectable()
class TokenService implements ITokenService {
  validateScope(allowedScope: ScopeDTO, requestScope: string): Partial<ScopeDTO> {
    const requestScopesArray = requestScope.toLowerCase().split(' ');
    const resultScope: Partial<ScopeDTO> = {};

    Object.keys(allowedScope).forEach((key) => {
      resultScope[key] = allowedScope[key] === true && requestScopesArray.includes(key);
    });

    if (!resultScope.id) {
      resultScope.id = true;
    }

    return resultScope;
  }

  calculateJwtExpiresAt(jwtExpiresIn: number): number {
    const currentTimestamp = Math.floor(Date.now() / 1000); // 현재 시간 (초 단위)
    const jwtExpiresAt = currentTimestamp + jwtExpiresIn; // 만료 시점 계산
    return jwtExpiresAt;
  }
}

export default TokenService;
