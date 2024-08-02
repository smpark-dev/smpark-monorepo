import { Response, NextFunction } from 'express';

import { IOauthRequest } from '@adapters-interfaces/express/IOauthRequest';

export interface IAuthenticationMiddleware {
  handle(req: IOauthRequest, res: Response, next: NextFunction): void;
}
