import { Response, NextFunction } from 'express';

import { IOauthRequest } from '@adapters-interfaces/express/IOauthRequest';

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
