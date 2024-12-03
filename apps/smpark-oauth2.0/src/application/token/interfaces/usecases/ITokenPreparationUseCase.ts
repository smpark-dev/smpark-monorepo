import type { GrantTypeOptions } from '@domain/clients/value-objects/GrantType';

export interface ITokenPrepareRequest {
  client_id: string;
  client_secret: string;
  code?: string;
  redirect_uri?: string;
  grant_type?: GrantTypeOptions;
  refresh_token?: string;
}

export interface ITokenPreparationUseCase {
  execute(tokenRequest: ITokenPrepareRequest): Promise<string>;
}
