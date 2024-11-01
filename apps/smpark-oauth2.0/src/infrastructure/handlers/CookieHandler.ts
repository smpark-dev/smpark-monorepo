import { Response } from 'express';
import { inject, injectable } from 'inversify';

import type { ICookieHandler, ICookieOptions } from '@adapters/shared/handlers/ICookieHandler';
import type { IEnvService } from '@domain/shared/interfaces/services/IEnvService';

@injectable()
class CookieHandler implements ICookieHandler {
  constructor(@inject('IEnvService') private envService: IEnvService) {}

  setCookie(res: Response, options: ICookieOptions): Response {
    const {
      name,
      value,
      maxAge = Number(this.envService.getLoginCookieExpiresIn()) * 1000,
      httpOnly = true,
      secure = this.envService.getNodeEnv() === 'production',
      sameSite = 'lax',
    } = options;

    return res.cookie(name, value, {
      maxAge,
      httpOnly,
      secure,
      sameSite,
    });
  }
}
export default CookieHandler;
