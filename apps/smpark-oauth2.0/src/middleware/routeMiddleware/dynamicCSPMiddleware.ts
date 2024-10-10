import { Response, NextFunction } from 'express';
import helmet from 'helmet';
import createError from 'http-errors';

import { IOauthRequest } from '@adapters-interfaces/express/IOauthRequest';
import { ERROR_MESSAGES } from '@constants/errorMessages';

const dynamicCSPMiddleware = (req: IOauthRequest, res: Response, next: NextFunction): void => {
  const addressUri = req.session.address_uri;

  if (!addressUri) {
    return next(createError(401, ERROR_MESSAGES.VALIDATION.MISSING.ADDRESS_URI));
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
