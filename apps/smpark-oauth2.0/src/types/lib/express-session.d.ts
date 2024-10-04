import 'express-session';
import { ScopeDTO } from '@dtos/TokenDTO';

declare module 'express-session' {
  interface SessionData {
    referer: string | null;
    state: string | null;
    user: { id: string; name: string; email: string } | null;
    codeValidatedIds: { id: string; client_id: string } | null;
    redirect_uri: string;
    address_uri: string;
    scope: ScopeDTO;
    updated: boolean;
  }
}
