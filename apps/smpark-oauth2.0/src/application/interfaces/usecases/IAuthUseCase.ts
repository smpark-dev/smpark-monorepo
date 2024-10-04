import { LoginDTO, RegisterDTO } from '@dtos/UserDTO';

export interface IUserLoginUseCase {
  execute(authenticationDTO: LoginDTO): Promise<string>;
}

export interface IUserRegistrationUseCase {
  execute(userRegisterInfo: RegisterDTO): Promise<void>;
}
