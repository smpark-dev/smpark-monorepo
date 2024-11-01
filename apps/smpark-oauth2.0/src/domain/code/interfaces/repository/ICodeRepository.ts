import Code from '@domain/code/entities/Code';
import AuthorizationCode from '@domain/code/value-objects/AuthorizationCode';
import BaseClientId from '@domain/shared/value-objects/BaseClientId';
import BaseId from '@domain/shared/value-objects/BaseId';

export interface ICodeRepository {
  findById(id: BaseId): Promise<Code | null>;
  findByCode(code: AuthorizationCode): Promise<{ code: Code; userId: BaseId } | null>;
  update(code: Code, userId: BaseId, clientId: BaseClientId): Promise<boolean>;
  delete(code: AuthorizationCode): Promise<boolean>;
}
