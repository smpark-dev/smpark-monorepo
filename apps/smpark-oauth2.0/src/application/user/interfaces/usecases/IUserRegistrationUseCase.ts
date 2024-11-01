export interface IUserRegisterRequest {
  id?: string;
  password?: string;
  name?: string;
  email?: string;
}

export interface IUserRegistrationUseCase {
  execute(userRegisterInfo: IUserRegisterRequest): Promise<void>;
}
