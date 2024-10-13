import { ScopeRequestDTO } from '@dtos/OAuthDTO';
import { LoginDTO, RegisterDTO } from '@dtos/UserDTO';

export interface IUserLoginUseCase {
  execute(authenticationDTO: LoginDTO): Promise<string>;
}

export interface IUserRegistrationUseCase {
  execute(userRegisterInfo: RegisterDTO): Promise<void>;
}

export interface IUserScopeUpdaterUseCase {
  execute(scopeRequest: ScopeRequestDTO): Promise<void>;
}
