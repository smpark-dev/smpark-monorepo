import User from '@domain/user/entities/User';

export interface IUserLogin {
  id: string;
  password: string;
}

export interface IUserAuthenticationService {
  authenticateUser(userLoginRequest: IUserLogin): Promise<User>;
}
