import { Response, NextFunction } from 'express';

import type { IOauthRequest } from '@infra-interfaces/IOauthRequest';

export interface IClientsController {
  renderClientRegistrationPage(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void>;

  registerClientsDetail(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response>;
  generateCredentials(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response>;
}
