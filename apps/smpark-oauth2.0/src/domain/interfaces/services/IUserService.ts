export interface IUserService {
  isValidId(id: string): boolean;
  isValidPassword(passwordHash: string): boolean;
  isValidEmail(email: string): boolean;
  isValidName(name: string): boolean;
}
