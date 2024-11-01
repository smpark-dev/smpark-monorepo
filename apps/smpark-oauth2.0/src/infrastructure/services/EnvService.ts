import { inject, injectable } from 'inversify';

import type { IEnvService } from '@domain/shared/interfaces/services/IEnvService';
import type { EnvConfig } from '@dotenv/env';

@injectable()
class EnvService implements IEnvService {
  constructor(@inject('env') private env: EnvConfig) {}

  getNodeEnv(): string {
    return this.env.nodeEnv;
  }

  getPort(): string {
    return this.env.port;
  }

  getRedisUrl(): string {
    return this.env.redisURL;
  }

  getLoginCookieExpiresIn(): string {
    return this.env.loginCookieExpiresIn;
  }

  getMongoDBUri(): string {
    return this.env.mongoDBUri;
  }

  getMongoDBSessionKey(): string {
    return this.env.mongoDBSessionKey;
  }

  getMongoDBUser(): string {
    return this.env.mongoDBUser;
  }

  getMongoDBName(): string {
    return this.env.mongoDBName;
  }

  getMongoDBSessionCollection(): string {
    return this.env.mongoDBSessionCollection;
  }

  getMongoDBPassword(): string {
    return this.env.mongoDBPassword;
  }

  getOAuthCodeExpiresIn(): string {
    return this.env.oauthCodeExpiresIn;
  }

  getOAuthAccessSecret(): string {
    return this.env.oauthAccessSecret;
  }

  getOAuthAccessTokenExpiresIn(): string {
    return this.env.oauthAccessTokenExpiresIn;
  }

  getOAuthRefreshSecret(): string {
    return this.env.oauthRefreshSecret;
  }

  getOAuthRefreshTokenExpiresIn(): string {
    return this.env.oauthRefreshTokenExpiresIn;
  }

  getIssuer(): string {
    return this.env.issuer;
  }
}

export default EnvService;
