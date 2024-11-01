import { Request, Response, NextFunction } from 'express';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { logger } from '@infrastructure/configs/winston';

interface HttpError extends Error {
  status?: number;
}

const errorHandlerMiddleware = (
  err: HttpError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || ERROR_MESSAGES.SERVER.ISSUE;

  logger.error(`[${new Date().toISOString()}] ${req.method} ${req.url} - ${errorMessage}`);

  if (req.headers['content-type']?.includes('application/json')) {
    return res.status(statusCode).json({ message: errorMessage });
  }

  if ([500, 501, 502, 503, 504].includes(statusCode)) {
    res.status(statusCode).render('main/error', {
      code: statusCode,
      message: ERROR_MESSAGES.SERVER.ISSUE,
    });
  } else if (statusCode === 404) {
    res.status(404).render('main/error', {
      code: 404,
      message: ERROR_MESSAGES.NOT_FOUND.PAGE,
    });
  } else if (statusCode === 401 || statusCode === 400) {
    return res.render('auth/login', {
      error: errorMessage,
      returnTo: req.originalUrl,
    });
  }
};

export default errorHandlerMiddleware;
