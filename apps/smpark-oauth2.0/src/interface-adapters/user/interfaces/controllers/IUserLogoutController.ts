import { Request, Response, NextFunction } from 'express';

export interface IUserLogoutController {
  userLogout(req: Request, res: Response, next: NextFunction): void;
}
