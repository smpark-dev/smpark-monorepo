import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import compression from 'compression';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import morgan from 'morgan';

import { stream } from '@configs/winston';
import errorHandlerMiddleware from '@middleware/globalMiddleware/errorHandlerMiddleware';
import rateLimiterMiddleware from '@middleware/globalMiddleware/rateLimiterMiddleware';

import type { EnvConfig } from '@lib/dotenv-env';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configureExpress = async (
  app: express.Application,
  sessionStore: MongoStore,
  env: EnvConfig,
): Promise<void> => {
  const viewsPath = path.join(__dirname, env.nodeEnv === 'production' ? 'src/views' : '../views');
  const staticPath = path.join(__dirname, env.nodeEnv === 'production' ? 'src/' : '../');

  app.set('views', viewsPath);
  app.set('view engine', 'pug');
  app.use(express.static(staticPath));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: env.mongoDBSessionKey,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: Number(env.oauthRefreshTokenExpiresIn) * 1000,
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
      },
    }),
  );

  // 로깅 미들웨어
  app.use(morgan('combined', { stream }));

  // 보안 미들웨어
  const isDevelopment = env.nodeEnv === 'development';
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          formAction: ["'self'"],
          scriptSrc: ["'self'"],
          upgradeInsecureRequests: isDevelopment ? null : [],
        },
      },
    }),
  );
  app.use(helmet.xssFilter());

  app.use((req, res, next) => {
    console.log('--- New Request ---');
    console.log('Session ID:', req.sessionID);
    console.log('Session:', JSON.stringify(req.session, null, 2));
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Secure:', req.secure);
    console.log('Protocol:', req.protocol);
    console.log('X-Forwarded-Proto:', req.get('X-Forwarded-Proto'));
    next();
  });

  // CORS 미들웨어
  app.use(cors());

  // 응답 압축 미들웨어
  app.use(compression());

  // 레이트 리미터 미들웨어
  app.use(rateLimiterMiddleware);

  // 라우트 핸들러
  const route = await import('../routes/indexRoute.js');
  app.use(route.default);

  // 에러 핸들러 미들웨어
  app.use(errorHandlerMiddleware);
};

export default configureExpress;
