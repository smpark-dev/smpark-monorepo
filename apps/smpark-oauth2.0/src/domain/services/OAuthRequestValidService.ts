import createError from 'http-errors';
import { injectable } from 'inversify';
import xss from 'xss';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { IOAuthRequestValidService } from '@domain-interfaces/services/IOAuthRequestValidService';
import { RequestValidDTO, ResponseValidDTO } from '@dtos/ClientsDTO';
import { AuthorizeRequestDTO, TokenRequestDTO, TokenValidateDTO } from '@dtos/OAuthDTO';
import { GrantType } from '@enums/oauth';

@injectable()
class OAuthRequestValidService implements IOAuthRequestValidService {
  validateAuthorizationRequest(
    request: AuthorizeRequestDTO,
    clients?: RequestValidDTO | null,
  ): ResponseValidDTO {
    const client_id = this.validateField(
      ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID,
      ERROR_MESSAGES.VALIDATION.MISMATCH.CLIENT_ID,
      request.client_id,
      clients?.client_id,
    );
    const redirect_uri = this.validateField(
      ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI,
      ERROR_MESSAGES.VALIDATION.MISMATCH.REDIRECT_URI,
      request.redirect_uri,
      clients?.redirect_uri,
    );
    let address_uri = '';
    if (clients) {
      address_uri = this.validateAddressURI(clients.address_uri);
    }

    const response_type = this.validateResponseType(request.response_type);

    return {
      client_id,
      redirect_uri,
      address_uri,
      response_type,
    };
  }

  validateTokenRequest(request: TokenRequestDTO, oauth?: TokenRequestDTO | null): TokenValidateDTO {
    const client_id = this.validateField(
      ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_ID,
      ERROR_MESSAGES.VALIDATION.MISMATCH.CLIENT_ID,
      request.client_id,
      oauth?.client_id,
    );
    const client_secret = this.validateField(
      ERROR_MESSAGES.VALIDATION.MISSING.CLIENT_SECRET,
      ERROR_MESSAGES.VALIDATION.MISMATCH.CLIENT_SECRET,
      request.client_secret,
      oauth?.client_secret,
    );
    const redirect_uri = this.validateField(
      ERROR_MESSAGES.VALIDATION.MISSING.REDIRECT_URI,
      ERROR_MESSAGES.VALIDATION.MISMATCH.REDIRECT_URI,
      request.redirect_uri,
      oauth?.redirect_uri,
    );
    const code = this.validateField(
      ERROR_MESSAGES.VALIDATION.MISSING.CODE,
      ERROR_MESSAGES.VALIDATION.MISMATCH.CODE,
      request.code,
      oauth?.code,
    );
    const grant_type = this.validateGrantType(request.grant_type);

    return {
      client_id,
      client_secret,
      redirect_uri,
      code,
      grant_type,
    };
  }

  protected validateField(
    missingErrorMsg: string,
    mismatchErrorMsg: string,
    requestValue?: string,
    clientValue?: string,
  ): string {
    if (!requestValue) {
      throw createError(400, missingErrorMsg);
    }

    if (clientValue && requestValue !== clientValue) {
      throw createError(401, mismatchErrorMsg);
    }

    return requestValue;
  }

  protected validateAddressURI(addressUri?: string): string {
    if (!addressUri) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.ADDRESS_URI);
    }

    return addressUri;
  }

  protected validateResponseType(responseType?: string): string {
    if (responseType && responseType.toLowerCase() !== 'code') {
      throw createError(401, ERROR_MESSAGES.VALIDATION.UNSUPPORTED.RESPONSE_TYPE);
    }

    if (!responseType) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.RESPONSE_TYPE);
    }

    return responseType;
  }

  protected validateGrantType(grantType?: string): GrantType {
    if (!grantType) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.GRANT_TYPE);
    }

    if (grantType !== 'authorization_code' && grantType !== 'refresh_token') {
      throw createError(401, ERROR_MESSAGES.VALIDATION.UNSUPPORTED.GRANT_TYPE);
    }
    return grantType;
  }

  protected normalizeUri(uri: string): string {
    const filteredUri = xss(uri);
    return filteredUri.endsWith('/') ? filteredUri.slice(0, -1) : filteredUri;
  }
}

export default OAuthRequestValidService;
