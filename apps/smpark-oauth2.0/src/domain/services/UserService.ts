import { injectable } from 'inversify';

import type { IUserService } from '@domain-interfaces/services/IUserService';

@injectable()
class UserService implements IUserService {
  isValidId(id: string): boolean {
    const idPattern = /^[a-zA-Z0-9]{4,16}$/;
    return idPattern.test(id);
  }

  isValidPassword(passwordHash: string): boolean {
    const passwordPattern = /^(?=.*\S).+$/;
    return passwordPattern.test(passwordHash);
  }

  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  isValidName(name: string): boolean {
    const namePattern = /^[^\s]{1,200}$/;
    return namePattern.test(name);
  }
}

export default UserService;
