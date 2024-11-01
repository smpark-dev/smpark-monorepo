import { Request } from 'express';

import type { IAuthorizeRequest } from '@application/clients/interfaces/usecases/IClientsAuthorizationVerifierUseCase';

export interface IOauthRequest extends Request {
  query: Partial<IAuthorizeRequest>;
}
