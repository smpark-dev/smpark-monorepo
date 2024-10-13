export interface IClientService {
  isValidScope(scope: { id: boolean; email: boolean; name: boolean }): boolean;
  isValidURI(url: string): boolean;
}
