import { Request, Response, NextFunction } from 'express';

export interface IClientsRegistrationController {
  renderClientRegisterPage(req: Request, res: Response, next: NextFunction): Promise<void>;

  registerClientsDetail(req: Request, res: Response, next: NextFunction): Promise<void | Response>;
}
