export interface IUserCollection {
  id: string;
  password: string;
  name: string;
  email: string;
  agreedScope?: { id: boolean; email: boolean; name: boolean };
}
