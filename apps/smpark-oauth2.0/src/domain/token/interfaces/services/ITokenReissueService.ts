export type ReissueState = 'fail' | 'pass' | 'update';

export interface IReissueTokenResult {
  state: ReissueState;
  data: {
    accessToken: string;
    userId: string;
  } | null;
}

export interface IAccessTokenValidation {
  isExpired: boolean;
  userId: string;
}

export interface IRefreshTokenValidation {
  isExpired: boolean;
  token: string;
}

export interface ITokenReissueService {
  reissueToken(accessToken: string): Promise<IReissueTokenResult>;
}
