import { Request, Response, NextFunction } from 'express';

import type { IScope } from '@domain/shared/value-objects/BaseScope';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  agreedScope?: IScope;
}

export interface IAuthenticationMiddleware {
  handle(req: Request, res: Response, next: NextFunction): void;
}
