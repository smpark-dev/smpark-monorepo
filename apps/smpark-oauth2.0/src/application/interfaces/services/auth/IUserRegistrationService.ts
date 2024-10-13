import { RegisterDTO } from '@dtos/UserDTO';

export interface IUserRegistrationService {
  registerUser(userInfo: RegisterDTO): Promise<void>;
}
