import Clients from '@domain/clients/entities/Clients';
import Code from '@domain/code/entities/Code';

import type { GrantTypeOptions } from '@domain/clients/value-objects/GrantType';

export interface ITokenPrepare {
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
  grant_type?: GrantTypeOptions;
  refresh_token?: string;
}

export interface ITokenPreparationService {
  prepareToken(tokenPrepare: ITokenPrepare, code: Code, clients: Clients): void;
}
