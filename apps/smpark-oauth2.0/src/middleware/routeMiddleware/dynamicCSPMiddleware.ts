import { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

const dynamicCSPMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const addressUri = req.session.address_uri;

  if (!addressUri) {
    return next(new CustomError(401, ERROR_MESSAGES.VALIDATION.MISSING.ADDRESS_URI));
  }

  const directives = helmet.contentSecurityPolicy.getDefaultDirectives();
  directives['form-action'] = ["'self'", addressUri];
  directives['script-src'] = ["'self'", addressUri];
  directives['connect-src'] = ["'self'", addressUri];
  directives['form-action'] = ["'self'", addressUri];
  directives['frame-ancestors'] = ["'none'"];

  helmet.contentSecurityPolicy({
    directives,
  })(req, res, next);
};

export default dynamicCSPMiddleware;
