import { injectable, inject } from 'inversify';

import type { ICodeGenerationService } from '@application-interfaces/services/code/ICodeGenerationService';
import type { ICodeGenerationUseCase } from '@application-interfaces/usecases/ICodeUseCase';

@injectable()
class CodeGenerationUseCase implements ICodeGenerationUseCase {
  constructor(
    @inject('ICodeGenerationService') private codeGenerationService: ICodeGenerationService,
  ) {}

  async execute(id?: string): Promise<string> {
    const code = await this.codeGenerationService.generateCode(id);

    return code;
  }
}

export default CodeGenerationUseCase;
