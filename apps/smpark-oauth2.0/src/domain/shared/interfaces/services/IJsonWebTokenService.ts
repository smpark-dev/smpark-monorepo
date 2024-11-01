export interface IJsonWebTokenService {
  generateToken(payload: object, jwtSecretKey: string, expiresIn: number): string;
  verifyTokenStrict<T>(token: string, jwtSecretKey: string): T;
  verifyTokenIgnoreExpiration<T>(token: string, jwtSecretKey: string): T;
  calculateJwtExpiresAt(jwtExpiresIn: number): number;
}
