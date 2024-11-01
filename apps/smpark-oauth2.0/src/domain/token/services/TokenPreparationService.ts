import { injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import Clients from '@domain/clients/entities/Clients';
import Code from '@domain/code/entities/Code';
import { CustomError } from '@domain/shared/errors/CustomError';

import type {
  ITokenPreparationService,
  ITokenPrepare,
} from '@domain/token/interfaces/services/ITokenPreparationService';

@injectable()
class TokenPreparationService implements ITokenPreparationService {
  prepareToken(tokenPrepare: ITokenPrepare, code: Code, clients: Clients) {
    if (tokenPrepare.client_id !== code.clientId.getValue()) {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.CLIENT_ID);
    }

    if (tokenPrepare.redirect_uri !== clients.redirect_uri.getValue()) {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.REDIRECT_URI);
    }

    if (tokenPrepare.grant_type !== clients.grant_type?.getValue()) {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.REDIRECT_URI);
    }
  }
}

export default TokenPreparationService;
