export interface ITokenManagementService {
  generateToken(payload: object, jwtSecretKey: string, expiresIn: number): string;
  verifyTokenStrict<T>(token: string, jwtSecretKey: string): T;
  verifyTokenIgnoreExpiration<T>(token: string, jwtSecretKey: string): T;
}
