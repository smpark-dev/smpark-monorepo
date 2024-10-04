import { ScopeDTO } from '@dtos/TokenDTO';

export interface ITokenService {
  generateToken(payload: object, jwtSecretKey: string, expiresIn: number): string;
  verifyTokenStrict<T>(token: string, jwtSecretKey: string): T;
  verifyTokenIgnoreExpiration<T>(token: string, jwtSecretKey: string): T;
  getDefaultScope(): ScopeDTO;
  validateScope(allowedScope: ScopeDTO, requestScope: string): Partial<ScopeDTO>;
  calculateJwtExpiresAt(jwtExpiresIn: number): number;
}
