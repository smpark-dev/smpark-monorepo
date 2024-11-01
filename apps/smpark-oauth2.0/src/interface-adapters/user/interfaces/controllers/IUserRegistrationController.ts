import { Request, Response, NextFunction } from 'express';

export interface IUserRegistrationController {
  renderRegisterPage(req: Request, res: Response): void;
  userRegister(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
