import { Request, Response, NextFunction } from 'express';

import type { IOauthRequest } from '@infra-interfaces/IOauthRequest';

export interface IOAuthController {
  verifyOauthRequest(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response>;

  oAuthUserLogin(req: IOauthRequest, res: Response, next: NextFunction): Promise<void | Response>;

  compareScope(req: IOauthRequest, res: Response, next: NextFunction): Promise<void | Response>;

  updateUserAgreedScope(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response>;

  verifyTokenRequest(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  generateCode(req: IOauthRequest, res: Response, next: NextFunction): Promise<void | Response>;

  generateAccessToken(req: Request, res: Response, next: NextFunction): Promise<void | Response>;

  disagree(req: Request, res: Response, next: NextFunction): void;
}
