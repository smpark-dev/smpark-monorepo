export interface ICodeGenerationService {
  generateCode(id?: string): Promise<string>;
}
