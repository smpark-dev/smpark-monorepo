import { Request, Response, NextFunction } from 'express';

export interface IClientsCredentialsController {
  generateCredentials(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
