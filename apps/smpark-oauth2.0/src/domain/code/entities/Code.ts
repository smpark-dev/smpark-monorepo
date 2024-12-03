import AuthorizationCode from '@domain/code/value-objects/AuthorizationCode';
// import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseExpiresAt from '@domain/shared/value-objects/BaseExpiresAt';
// import Scope from '@domain/shared/value-objects/BaseScope';
import BaseURI from '@domain/shared/value-objects/BaseURI';

import type { IUUIDv4Service } from '@domain/shared/interfaces/services/IUUIDv4Service';

class Code {
  #code: AuthorizationCode;
  #clientId: BaseClientId;
  #expiresAt: BaseExpiresAt;
  #redirectUri: BaseURI;
  // #scopes: Scope;

  constructor(
    code: AuthorizationCode,
    clientId: BaseClientId,
    expiresAt: BaseExpiresAt,
    redirectUri: BaseURI,
    // scopes: Scope,
  ) {
    this.#code = code;
    this.#expiresAt = expiresAt;
    this.#redirectUri = redirectUri;
    this.#clientId = clientId;
    // this.#scopes = scopes;
  }

  get code(): AuthorizationCode {
    return this.#code;
  }

  get expiresAt(): BaseExpiresAt {
    return this.#expiresAt;
  }

  get clientId(): BaseClientId {
    return this.#clientId;
  }

  get redirectUri(): BaseURI {
    return this.#redirectUri;
  }

  // get scopes(): Scope {
  //   return this.#scopes;
  // }

  static create(code?: string, clientId?: string, expiresAt?: number, redirect_uri?: string): Code {
    return new Code(
      AuthorizationCode.validate(code),
      BaseClientId.validate(clientId),
      BaseExpiresAt.validate(expiresAt),
      BaseURI.validate(redirect_uri, 'REDIRECT_URI'),
    );
  }

  static validateCode(code?: string) {
    return new AuthorizationCode(code);
  }

  static createAuthorizeCode(uuidGenerator: IUUIDv4Service): AuthorizationCode {
    const uuid = uuidGenerator.generate();
    return new AuthorizationCode(uuid);
  }

  static calculateExpiryTime(seconds: number): number {
    const now = new Date();
    now.setSeconds(now.getSeconds() + seconds);
    return Math.floor(now.getTime() / 1000);
  }

  static validateExpiresAt(inputExpiresAt: number): BaseExpiresAt {
    return BaseExpiresAt.validate(inputExpiresAt);
  }
}

export default Code;
