export interface IGenerateCodeRequest {
  id: string;
  redirect_uri: string;
  client_id: string;
}

export interface IGenerateCodeResponse {
  code: string;
  redirect_uri: string;
}

export interface ICodeGenerationUseCase {
  execute(codeRequest: IGenerateCodeRequest): Promise<IGenerateCodeResponse>;
}
