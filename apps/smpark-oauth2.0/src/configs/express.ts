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

  app.use(
    session({
      secret: env.mongoDBSessionKey,
      resave: false,
      saveUninitialized: false,
      store: sessionStore,
      cookie: {
        maxAge: Number(env.oauthRefreshTokenExpiresIn) * 1000,
        httpOnly: true,
        secure: env.nodeEnv === 'production',
        sameSite: 'strict',
      },
    }),
  );

  // 로깅 미들웨어
  app.use(morgan('combined', { stream }));

  // 보안 미들웨어
  const isDevelopment = process.env.NODE_ENV === 'development';
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

  // CORS 옵션 구성
  // const corsOptions = {
  //   origin(origin: string | undefined, callback: (error: Error | null, allow?: boolean) => void) {
  //     if (!origin || ALLOWED_CLIENTS.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   methods: ['GET', 'POST'], // OAuth 2.0에 필요한 메서드만 허용
  //   allowedHeaders: ['Content-Type', 'Authorization'],
  //   credentials: true, // 인증 정보 포함 허용
  //   maxAge: 86400, // CORS 프리플라이트 요청 결과를 1일 동안 캐시
  // };

  // CORS 미들웨어
  app.use(
    cors({
      origin: ['https://smpark.dev'],
      credentials: true,
    }),
  );

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
