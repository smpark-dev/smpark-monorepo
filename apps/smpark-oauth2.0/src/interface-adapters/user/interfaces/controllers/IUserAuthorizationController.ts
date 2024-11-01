import type { Request, Response, NextFunction } from 'express';

export interface IUserAuthorizationController {
  updateUserAgreedScope(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
