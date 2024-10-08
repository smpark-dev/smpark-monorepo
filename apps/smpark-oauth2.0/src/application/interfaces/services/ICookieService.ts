import { Response } from 'express';

export interface CookieOptions {
  name: string;
  value: string;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export interface ICookieService {
  setCookie(res: Response, options: CookieOptions): Response;
}
