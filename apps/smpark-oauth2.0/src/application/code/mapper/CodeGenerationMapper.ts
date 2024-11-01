import Code from '@domain/code/entities/Code';

class CodeGenerationMapper {
  static toCodeGenerate(code: Code): {
    code: string;
    redirect_uri: string;
  } {
    return {
      code: code.code.getValue(),
      redirect_uri: code.redirectUri.getValue(),
    };
  }
}

export default CodeGenerationMapper;
