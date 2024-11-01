import { injectable } from 'inversify';

import Code from '@domain/code/entities/Code';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseId from '@domain/shared/value-objects/BaseId';

import type { ICodeCollection } from '@infrastructure/interfaces/collections/ICodeCollection';

@injectable()
class CodeMapper {
  static toDataBase(code: Code, userId: BaseId, clientId: BaseClientId): ICodeCollection {
    return {
      id: userId.getValue(),
      code: code.code.getValue(),
      client_id: clientId.getValue(),
      expiresAt: code.expiresAt.getValue(),
      redirect_uri: code.redirectUri.getValue(),
    };
  }

  static toEntity(data: {
    code: string;
    client_id: string;
    expiresAt: number;
    redirect_uri: string;
  }): Code {
    return Code.create(data.code, data.client_id, data.expiresAt, data.redirect_uri);
  }
}

export default CodeMapper;
