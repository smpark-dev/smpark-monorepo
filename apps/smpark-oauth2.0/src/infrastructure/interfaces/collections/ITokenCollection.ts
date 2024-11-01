export interface ITokenCollection {
  tokenId: string;
  accessToken: string;
  refreshToken: string;
  tokenGrantedScopes: {
    id: boolean;
    email: boolean;
    name: boolean;
  };
}
