import { Response } from 'express';
import { inject, injectable } from 'inversify';

import type { CookieOptions, ICookieHandler } from '@adapters-interfaces/handlers/ICookieHandler';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class CookieHandler implements ICookieHandler {
  constructor(@inject('env') private env: EnvConfig) {}

  setCookie(res: Response, options: CookieOptions): Response {
    const {
      name,
      value,
      maxAge = Number(this.env.loginCookieExpiresIn) * 1000,
      httpOnly = true,
      secure = this.env.nodeEnv === 'production',
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
