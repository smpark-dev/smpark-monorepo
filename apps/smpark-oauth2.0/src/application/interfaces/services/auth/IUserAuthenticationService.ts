import { LoginDTO } from '@dtos/UserDTO';
import User from '@entities/User';

export interface IUserAuthenticationService {
  authenticateUser(loginDTO: LoginDTO): Promise<{ user: User; id: string }>;
}
