import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

import type { IScope } from '@domain/shared/value-objects/BaseScope';

export class UserAgreeScopeUpdaterRequestDTO {
  agreedScope: IScope;
  isUpdated: boolean;
  id: string;

  constructor(data: { agreedScope?: IScope; isUpdated?: boolean; id?: string }) {
    if (!data.id) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }
    if (typeof data.isUpdated !== 'boolean') {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.CONSENT_UPDATE);
    }
    if (!data.agreedScope) {
      throw new CustomError(400, ERROR_MESSAGES.VALIDATION.MISSING.SCOPE);
    }

    this.agreedScope = data.agreedScope;
    this.isUpdated = data.isUpdated;
    this.id = data.id;
  }
}
