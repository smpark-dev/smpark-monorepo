import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: 'apps/smpark-resource/.env.production' });
} else {
  dotenv.config({ path: 'apps/smpark-resource/.env.development' });
}

const env = {
  nodeEnv: process.env.NODE_ENV as string,
  port: process.env.APP_PORT as string,
  mongoDBUri: process.env.MONGO_DATABASE_URI as string,
  mongoDBUser: process.env.MONGO_DATABASE_USER as string,
  mongoDBName: process.env.MONGO_DATABASE_NAME as string,
  mongoDBPassword: process.env.MONGO_DATABASE_PASSWORD as string,
  oauthAccessSecretKey: process.env.OAUTH_ACCESS_SECRET_KEY as string,
};

export default env;
