import { Response } from 'express';

export interface ICookieOptions {
  name: string;
  value: string;
  maxAge?: number;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

export interface ICookieHandler {
  setCookie(res: Response, options: ICookieOptions): Response;
}
