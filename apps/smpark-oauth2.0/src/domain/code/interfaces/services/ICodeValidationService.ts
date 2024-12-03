import Code from '@domain/code/entities/Code';
import BaseId from '@domain/shared/value-objects/BaseId';

export interface ICodeValidationService {
  validateCode(codeRequest?: string): Promise<{ code: Code; userId: BaseId }>;
}
