import { Response, NextFunction } from 'express';

import type { IOauthRequest } from '@infrastructure/interfaces/http-request/IOauthRequest';

export interface IClientsVerifierController {
  verifyOauthRequest(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response>;
  compareScope(req: IOauthRequest, res: Response, next: NextFunction): Promise<void | Response>;
}
