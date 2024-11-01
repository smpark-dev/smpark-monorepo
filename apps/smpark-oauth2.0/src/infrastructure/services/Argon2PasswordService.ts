import argon2 from 'argon2';
import { injectable } from 'inversify';

import type { IArgon2PasswordService } from '@domain/shared/interfaces/services/IArgon2PasswordService';

@injectable()
class Argon2PasswordService implements IArgon2PasswordService {
  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }

  async hashedPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }
}
export default Argon2PasswordService;
