import { Request, Response, NextFunction } from 'express';

export interface ITokenGenerationController {
  verifyTokenRequest(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
  generateAccessToken(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
