import { injectable } from 'inversify';

import type { IClientService } from '@domain-interfaces/services/IClientService';

@injectable()
class ClientService implements IClientService {
  isValidScope(scope: { id: boolean; email: boolean; name: boolean }): boolean {
    if (!scope.id) {
      return false;
    }

    return true;
  }

  isValidURI(url: string): boolean {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|localhost|\\d{1,3}(\\.\\d{1,3}){3})' +
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$',
      'i',
    );

    return urlPattern.test(url);
  }
}
export default ClientService;
