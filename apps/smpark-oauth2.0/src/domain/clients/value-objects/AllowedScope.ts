import { DEFAULT_SCOPE } from '@constants/scopes';
import BaseScope, { IScope } from '@domain/shared/value-objects/BaseScope';
import { deepEqual } from '@utils/deepEqual';

class AllowedScope extends BaseScope {
  private allowedScope: IScope;

  constructor(allowedScope: IScope) {
    super(allowedScope);
    this.allowedScope = allowedScope;
  }

  validateRequestedScope(requestScope: string): IScope {
    const requestScopesArray = requestScope.toLowerCase().split(' ');
    const resultScope: IScope = DEFAULT_SCOPE;

    Object.keys(this.allowedScope).forEach((key) => {
      resultScope[key] = this.allowedScope[key] === true && requestScopesArray.includes(key);
    });

    if (!resultScope.id) {
      resultScope.id = true;
    }

    return resultScope;
  }

  compareWithAgreedScope(agreedScopes: IScope): boolean {
    return deepEqual(this.allowedScope, agreedScopes);
  }
}

export default AllowedScope;
