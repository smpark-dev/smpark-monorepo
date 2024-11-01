import { inject, injectable } from 'inversify';

import { TokenVerifierRequestDTO } from '@adapters/token/dtos/TokenVerifierRequestDTO';
import { ERROR_MESSAGES } from '@constants/errorMessages';
import { CustomError } from '@domain/shared/errors/CustomError';

import type { ITokenGenerationController } from '@adapters/token/interfaces/ITokenGenerationController';
import type { ITokenOAuthIssuanceUseCase } from '@application/token/interfaces/usecases/ITokenOAuthIssuanceUseCase';
import type { ITokenPreparationUseCase } from '@application/token/interfaces/usecases/ITokenPreparationUseCase';
import type { Request, Response, NextFunction } from 'express';

@injectable()
class TokenGenerationController implements ITokenGenerationController {
  constructor(
    @inject('ITokenPreparationUseCase') private tokenPreparationUseCase: ITokenPreparationUseCase,
    @inject('ITokenOAuthIssuanceUseCase')
    private tokenOAuthIssuanceUseCase: ITokenOAuthIssuanceUseCase,
  ) {}

  verifyTokenRequest = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const authHeader = req.headers?.authorization;
      if (!authHeader || !authHeader.startsWith('Basic ')) {
        throw new CustomError(401, ERROR_MESSAGES.VALIDATION.FORMAT.AUTHENTICATION);
      }

      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
      const [client_id, client_secret] = credentials.split(':');

      const tokenRequestDTO = new TokenVerifierRequestDTO({
        ...req.body,
        client_id,
        client_secret,
        userId: req.userId,
      });

      const userId = await this.tokenPreparationUseCase.execute(tokenRequestDTO);
      req.codeValidatedIds = { client_id, id: userId };
      next();
    } catch (error) {
      next(error);
    }
  };

  generateAccessToken = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    const ids = req.codeValidatedIds;

    try {
      const tokens = await this.tokenOAuthIssuanceUseCase.execute(ids);
      return res.json({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        token_type: 'Bearer',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default TokenGenerationController;
