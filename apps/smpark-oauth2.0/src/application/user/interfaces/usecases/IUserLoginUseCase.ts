export interface IUserLoginRequest {
  id: string;
  password: string;
}

export interface IUserLoginResponse {
  accessToken: string;
  userId: string;
}

export interface IUserLoginUseCase {
  execute(userLoginRequest: IUserLoginRequest): Promise<IUserLoginResponse>;
}
