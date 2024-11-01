export interface IEnvService {
  getNodeEnv(): string;
  getPort(): string;
  getRedisUrl(): string;
  getLoginCookieExpiresIn(): string;

  getMongoDBUri(): string;
  getMongoDBSessionKey(): string;
  getMongoDBUser(): string;
  getMongoDBName(): string;
  getMongoDBSessionCollection(): string;
  getMongoDBPassword(): string;

  getOAuthCodeExpiresIn(): string;
  getOAuthAccessSecret(): string;
  getOAuthAccessTokenExpiresIn(): string;
  getOAuthRefreshSecret(): string;
  getOAuthRefreshTokenExpiresIn(): string;
  getIssuer(): string;
}
