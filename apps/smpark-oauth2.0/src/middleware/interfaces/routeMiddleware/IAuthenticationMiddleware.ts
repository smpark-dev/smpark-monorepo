import { Response, NextFunction } from 'express';

import type { IOauthRequest } from '@infra-interfaces/IOauthRequest';

export interface IAuthenticationMiddleware {
  handle(req: IOauthRequest, res: Response, next: NextFunction): void;
}
