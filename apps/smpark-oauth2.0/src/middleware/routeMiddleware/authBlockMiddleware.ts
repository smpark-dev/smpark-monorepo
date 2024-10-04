import { Request, Response, NextFunction } from 'express';

const authBlockMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const accessToken = req.cookies.auth_token;

  if (accessToken) {
    return res.redirect('/oauth/register');
  }
  next();
};

export default authBlockMiddleware;
