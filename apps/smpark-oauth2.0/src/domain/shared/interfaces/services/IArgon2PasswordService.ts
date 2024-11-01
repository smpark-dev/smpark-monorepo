export interface IArgon2PasswordService {
  comparePassword(password: string, hashedPassword: string): Promise<boolean>;
  hashedPassword(password: string): Promise<string>;
}
