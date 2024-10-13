import argon2 from 'argon2';
import createError from 'http-errors';
import { inject, injectable } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { UserDTO, RegisterDTO } from '@dtos/UserDTO';
import User from '@entities/User';
import UserMapper from '@mapper/UserMapper';

import type { IUserRegistrationService } from '@application-interfaces/services/auth/IUserRegistrationService';
import type { IClientsOAuthVerifierService } from '@application-interfaces/services/clients/IClientsOAuthVerifierService';
import type { IUserRepository } from '@domain-interfaces/infrastructure/repository/IUserRepository';
import type { IUserService } from '@domain-interfaces/services/IUserService';

@injectable()
class UserRegistrationService implements IUserRegistrationService {
  constructor(
    @inject('IUserService') private userValidationService: IUserService,
    @inject(UserMapper) private userMapper: UserMapper,
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IClientsOAuthVerifierService')
    private oAuthVerifierService: IClientsOAuthVerifierService,
  ) {}

  async registerUser(userInfo: RegisterDTO): Promise<void> {
    const verifiedInfo = this.verifySignUpInfo(userInfo);

    const user = this.userMapper.toEntity(verifiedInfo);

    this.validSignUpInfo(user);

    const { id, password } = verifiedInfo;

    const fetchedUser = await this.userRepository.findById(id);

    this.oAuthVerifierService.verifyRegUser(fetchedUser);

    // Todo :: 이메일 확인 관련 기능 보류 (2024-07 작성)
    // const userByEmail = await this.userRepository.findByEmail(email);

    const hashedPassword = await this.hashedPassword(password);
    const updatedInfo = {
      ...verifiedInfo,
      password: hashedPassword,
    };

    const isSaved = await this.userRepository.save(updatedInfo);

    this.oAuthVerifierService.verifyOperation(isSaved);
  }

  private async hashedPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  private validSignUpInfo(user: User): void {
    const isId = this.userValidationService.isValidId(user.id);

    if (!isId) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.FORMAT.USERNAME);
    }

    const isEmail = this.userValidationService.isValidEmail(user.email);

    if (!isEmail) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.FORMAT.EMAIL);
    }

    const isName = this.userValidationService.isValidName(user.name);

    if (!isName) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.FORMAT.NAME);
    }
  }

  private verifySignUpInfo(user: RegisterDTO): UserDTO {
    const { id, password, name, email } = user;

    if (!id) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.ID);
    }

    if (!password) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.PASSWORD);
    }

    if (!name) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.NAME);
    }

    if (!email) {
      throw createError(400, ERROR_MESSAGES.VALIDATION.MISSING.EMAIL);
    }

    return {
      id,
      password,
      name,
      email,
    };
  }
}

export default UserRegistrationService;
