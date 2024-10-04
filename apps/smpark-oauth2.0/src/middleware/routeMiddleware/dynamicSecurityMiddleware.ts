import cors from 'cors';
import { Response, NextFunction } from 'express';
import helmet from 'helmet';
import createError from 'http-errors';

import { IOauthRequest } from '@adapters-interfaces/express/IOauthRequest';
import { ERROR_MESSAGES } from '@constants/errorMessages';

const dynamicSecurityMiddleware = (req: IOauthRequest, res: Response, next: NextFunction): void => {
  const refererUri = req.headers.referer;

  if (!refererUri) {
    return next(createError(401, ERROR_MESSAGES.VALIDATION.MISSING.REFERER_URI));
  }

  // CORS 설정
  cors({
    origin: refererUri,
    credentials: true,
  })(req, res, (err) => {
    if (err) {
      return next(createError(500, 'CORS configuration failed'));
    }

    // CSP 설정
    const directives = helmet.contentSecurityPolicy.getDefaultDirectives();
    directives['form-action'] = ["'self'", refererUri];

    helmet.contentSecurityPolicy({
      directives,
    })(req, res, next);
  });
};

export default dynamicSecurityMiddleware;
