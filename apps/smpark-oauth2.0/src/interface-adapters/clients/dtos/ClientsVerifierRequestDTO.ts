import { ERROR_MESSAGES } from '@constants/errorMessages';
import { ResponseType } from '@domain/clients/entities/Clients';
import { CustomError } from '@domain/shared/errors/CustomError';

export class AuthorizationRequestDTO {
  id?: string;
  client_id?: string;
  redirect_uri?: string;
  scope?: string;
  state?: string;
  response_type?: ResponseType;

  constructor(data: {
    id?: string;
    client_id?: string;
    redirect_uri?: string;
    scope?: string;
    state?: string;
    response_type?: ResponseType;
  }) {
    this.id = data.id;
    this.client_id = data.client_id;
    this.redirect_uri = data.redirect_uri;
    this.scope = data.scope;
    this.state = data.state;
    this.response_type = data.response_type;

    if (!this.id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }
    if (!this.client_id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID);
    }
    if (!this.redirect_uri) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI);
    }

    if (this.response_type && this.response_type.toLowerCase() !== 'code') {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.UNSUPPORTED.RESPONSE_TYPE);
    }

    if (!this.response_type) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.RESPONSE_TYPE);
    }
  }
}

export class ScopeRequestDTO {
  id: string;
  client_id: string;
  scope?: string;

  constructor(scopeRequest: { id?: string; client_id?: string; scope?: string }) {
    if (!scopeRequest.id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }
    if (!scopeRequest.client_id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID);
    }

    // if (!scopeRequest.scope) {
    //   throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.SCOPE);
    // }
    this.id = scopeRequest.id;
    this.client_id = scopeRequest.client_id;
    this.scope = scopeRequest.scope;
  }
}
