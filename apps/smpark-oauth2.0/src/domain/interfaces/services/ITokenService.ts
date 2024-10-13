import { ScopeDTO } from '@dtos/TokenDTO';

export interface ITokenService {
  validateScope(allowedScope: ScopeDTO, requestScope: string): Partial<ScopeDTO>;
  calculateJwtExpiresAt(jwtExpiresIn: number): number;
}
