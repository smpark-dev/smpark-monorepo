import { Request, Response, NextFunction } from 'express';

export interface IAuthBlockMiddleware {
  handle(req: Request, res: Response, next: NextFunction): Promise<void>;
}
