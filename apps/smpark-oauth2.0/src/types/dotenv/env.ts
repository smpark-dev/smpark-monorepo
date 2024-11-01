export type EnvConfig = {
  nodeEnv: string;
  port: string;
  redisURL: string;
  loginCookieExpiresIn: string;
  mongoDBUri: string;
  mongoDBUser: string;
  mongoDBName: string;
  mongoDBSessionCollection: string;
  mongoDBPassword: string;
  mongoDBSessionKey: string;
  oauthCodeExpiresIn: string;
  oauthAccessSecret: string;
  oauthRefreshSecret: string;
  oauthAccessTokenExpiresIn: string;
  oauthRefreshTokenExpiresIn: string;
  issuer: string;
};
