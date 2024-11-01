import { inject, injectable } from 'inversify';

import { CodeGenerationRequestDTO } from '@adapters/code/dtos/CodeGenerationRequestDTO';

import type { ICodeGenerationUseCase } from '@application/code/interfaces/usecases/ICodeGenerationUseCase';
import type { Request, Response, NextFunction } from 'express';

@injectable()
class CodeGenerationController {
  constructor(
    @inject('ICodeGenerationUseCase') private codeGenerationUseCase: ICodeGenerationUseCase,
  ) {}

  generateCode = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const codeGenerateRequestDTO = new CodeGenerationRequestDTO({
        id: req.userId,
        redirect_uri: req.session.redirect_uri,
        client_id: req.session.client_id,
      });

      const verifyCodeResponse = await this.codeGenerationUseCase.execute(codeGenerateRequestDTO);
      const { code, redirect_uri } = verifyCodeResponse;

      return res.redirect(`${redirect_uri}?code=${code}&state=${req.session.state}`);
    } catch (error) {
      next(error);
    }
  };
}
export default CodeGenerationController;
