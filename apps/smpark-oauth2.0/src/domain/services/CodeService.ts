import { injectable } from 'inversify';
import { v4 as uuidv4 } from 'uuid';

import { ICodeService } from '@domain-interfaces/services/ICodeService';

@injectable()
class CodeService implements ICodeService {
  generateCode(): string {
    return uuidv4().substring(0, 15);
  }

  calculateExpiryTime(seconds: number): number {
    const now = new Date();
    now.setSeconds(now.getSeconds() + seconds);
    return Math.floor(now.getTime() / 1000);
  }

  validateCodeExpiresAt(expiresAt: number): boolean {
    const currentTime = Date.now() / 1000;

    return currentTime >= expiresAt;
  }
}
export default CodeService;
