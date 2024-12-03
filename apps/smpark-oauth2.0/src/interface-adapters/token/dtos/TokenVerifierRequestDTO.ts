import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

import type { GrantTypeOptions } from '@domain/clients/value-objects/GrantType';

export class TokenVerifierRequestDTO {
  client_id: string;
  client_secret: string;
  redirect_uri?: string;
  code?: string;
  grant_type?: GrantTypeOptions;
  refresh_token?: string;

  constructor(data: {
    client_id?: string;
    client_secret?: string;
    code?: string;
    redirect_uri?: string;
    grant_type?: GrantTypeOptions;
    refresh_token?: string;
  }) {
    if (!data.client_id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID);
    }
    if (!data.client_secret) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_SECRET);
    }

    this.client_id = data.client_id;
    this.client_secret = data.client_secret;
    this.code = data.code;
    this.redirect_uri = data.redirect_uri;
    this.grant_type = data.grant_type;
    this.refresh_token = data.refresh_token || '';
  }
}
