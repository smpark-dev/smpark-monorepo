import type { Request, Response, NextFunction } from 'express';

export interface ICodeGenerationController {
  generateCode(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
