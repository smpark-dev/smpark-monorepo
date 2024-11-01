import Code from '@domain/code/entities/Code';

export interface ICodeRequest {
  id: string;
  redirect_uri: string;
  client_id: string;
}

export interface ICodeGenerationService {
  generateCode(codeRequest: ICodeRequest): Promise<Code>;
}
