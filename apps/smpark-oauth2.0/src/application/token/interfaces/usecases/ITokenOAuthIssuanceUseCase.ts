export interface ICredentialRequest {
  client_id?: string;
  id?: string;
}

export interface ITokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface ITokenOAuthIssuanceUseCase {
  execute(ids?: ICredentialRequest | null): Promise<ITokenResponse>;
}
