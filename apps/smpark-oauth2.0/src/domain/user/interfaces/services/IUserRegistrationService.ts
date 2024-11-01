export interface IUserRegister {
  id?: string;
  password?: string;
  name?: string;
  email?: string;
}

export interface IUserRegistrationService {
  registerUser(userRegisterRequest: IUserRegister): Promise<void>;
}
