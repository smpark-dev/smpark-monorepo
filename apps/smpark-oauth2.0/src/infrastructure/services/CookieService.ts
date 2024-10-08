import { Response } from 'express';
import { inject, injectable } from 'inversify';

import type {
  CookieOptions,
  ICookieService,
} from '@application-interfaces/services/ICookieService';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class CookieService implements ICookieService {
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
export default CookieService;
