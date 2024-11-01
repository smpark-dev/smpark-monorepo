import { Request, Response, NextFunction } from 'express';
import { injectable } from 'inversify';

import type { IUserLogoutController } from '@adapters/user/interfaces/controllers/IUserLogoutController';

@injectable()
class LogoutController implements IUserLogoutController {
  userLogout = (req: Request, res: Response, next: NextFunction): void => {
    req.session.destroy((error) => {
      if (error) {
        next(error);
      }

      res.clearCookie('smpark-auth');
      res.clearCookie('connect.sid');

      return res.redirect('/');
    });
  };
}

export default LogoutController;
