import type { IScope } from '@domain/shared/value-objects/BaseScope';
import 'express';
import 'express-session';

declare global {
  namespace Express {
    interface Request {
      referer?: string;
      state?: string;
      userId?: string;
      codeValidatedIds?: { id: string; client_id: string };
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    redirect_uri: string;
    scope: IScope;
    isUpdated: boolean;
    address_uri: string;
    client_id: string;
    state?: string;
  }
}
