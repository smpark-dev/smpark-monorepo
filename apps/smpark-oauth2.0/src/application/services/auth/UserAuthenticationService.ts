import argon2 from 'argon2';
import createError from 'http-errors';
import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { LoginDTO } from '@dtos/UserDTO';
import User from '@entities/User';
import UserMapper from '@mapper/UserMapper';

import type { IUserAuthenticationService } from '@application-interfaces/services/auth/IUserAuthenticationService';
import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { IUserRepository } from '@domain-interfaces/infrastructure/repository/IUserRepository';
import type { IUserService } from '@domain-interfaces/services/IUserService';

@injectable()
class UserAuthenticationService implements IUserAuthenticationService {
  constructor(
    @inject('IUserService') private userValidationService: IUserService,
    @inject(UserMapper) private userMapper: UserMapper,
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
  ) {}

  async authenticateUser(loginDTO: LoginDTO): Promise<{ user: User; id: string }> {
    const { id, password } = this.verifySignInInfo(loginDTO);
    const fetchedUser = await this.userRepository.findById(id);
    const verifiedUser = this.oAuthVerifierService.verifyUser(fetchedUser);
    const user = this.userMapper.toEntity(verifiedUser);
    await this.authenticate(user, password, verifiedUser.password);

    return { user, id };
  }

  private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return argon2.verify(hashedPassword, password);
  }

  private verifySignInInfo(user: LoginDTO): { id: string; password: string } {
    const { id, password } = user;

    if (!id) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }

    if (!password) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.PASSWORD);
    }

    return { id, password };
  }

  private async authenticate(user: User, password: string, hashedPassword: string): Promise<void> {
    const isId = this.userValidationService.isValidId(user.id);
    const isPassword = isId && this.userValidationService.isValidPassword(password);
    const isCompare = isPassword && (await this.comparePassword(password, hashedPassword));

    if (!isId || !isPassword || !isCompare) {
      throw createError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.CREDENTIALS);
    }
  }
}

export default UserAuthenticationService;
