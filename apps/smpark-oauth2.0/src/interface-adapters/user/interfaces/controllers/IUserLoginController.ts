import { Request, Response, NextFunction } from 'express';

export interface IUserLoginController {
  renderLoginPage(req: Request, res: Response): void;
  userLogin(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  authorizeUserLogin(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
