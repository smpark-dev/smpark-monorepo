export interface IRedisTokenRepository {
  save(type: string, userId: string, token: string, expiresIn: number): Promise<boolean>;
  find(type: string, userId: string): Promise<string | null>;
  delete(type: string, userId: string): Promise<boolean>;
}
