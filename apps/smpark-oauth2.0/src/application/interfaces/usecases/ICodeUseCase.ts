export interface ICodeGenerationUseCase {
  execute(id?: string): Promise<string>;
}
