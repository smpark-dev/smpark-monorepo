import { injectable, inject } from 'inversify';

import CodeGenerationMapper from '@application/code/mapper/CodeGenerationMapper';

import type {
  ICodeGenerationUseCase,
  IGenerateCodeRequest,
  IGenerateCodeResponse,
} from '@application/code/interfaces/usecases/ICodeGenerationUseCase';
import type { ICodeGenerationService } from '@domain/code/interfaces/services/ICodeGenerationService';

@injectable()
class CodeGenerationUseCase implements ICodeGenerationUseCase {
  constructor(
    @inject('ICodeGenerationService')
    private codeGenerationService: ICodeGenerationService,
  ) {}

  async execute(codeRequest: IGenerateCodeRequest): Promise<IGenerateCodeResponse> {
    const generatedCode = await this.codeGenerationService.generateCode(codeRequest);
    return CodeGenerationMapper.toCodeGenerate(generatedCode);
  }
}

export default CodeGenerationUseCase;
