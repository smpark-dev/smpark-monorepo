import { Response, NextFunction } from 'express';
import helmet from 'helmet';
import createError from 'http-errors';

import { IOauthRequest } from '@adapters-interfaces/express/IOauthRequest';
import { ERROR_MESSAGES } from '@constants/errorMessages';

const dynamicCSPMiddleware = (req: IOauthRequest, res: Response, next: NextFunction): void => {
  const refererUri = req.session.verifiedRefererUri;

  if (!refererUri) {
    return next(createError(401, ERROR_MESSAGES.VALIDATION.MISSING.REFERER_URI));
  }

  const directives = helmet.contentSecurityPolicy.getDefaultDirectives();
  directives['form-action'] = ["'self'", refererUri];

  helmet.contentSecurityPolicy({
    directives,
  })(req, res, next);
};

export default dynamicCSPMiddleware;
