import { Response, NextFunction } from 'express';
import { injectable, inject } from 'inversify';

import {
  AuthorizationRequestDTO,
  ScopeRequestDTO,
} from '@adapters/clients/dtos/ClientsVerifierRequestDTO';
import { CodeGenerationRequestDTO } from '@adapters/code/dtos/CodeGenerationRequestDTO';
import { TRANSLATIONS_SCOPE } from '@constants/scopes';

import type { IClientsVerifierController } from '@adapters/clients/interfaces/controllers/IClientsVerifierController';
import type { IClientsAuthorizationVerifierUseCase } from '@application/clients/interfaces/usecases/IClientsAuthorizationVerifierUseCase';
import type { IClientsScopeComparisonUseCase } from '@application/clients/interfaces/usecases/IClientsScopeComparisonUseCase';
import type { ICodeGenerationUseCase } from '@application/code/interfaces/usecases/ICodeGenerationUseCase';
import type { IOauthRequest } from '@infrastructure/interfaces/http-request/IOauthRequest';

@injectable()
class ClientsVerifierController implements IClientsVerifierController {
  constructor(
    @inject('IClientsAuthorizationVerifierUseCase')
    private clientsAuthorizationVerifierUseCase: IClientsAuthorizationVerifierUseCase,
    @inject('IClientsScopeComparisonUseCase')
    private clientsScopeComparisonUseCase: IClientsScopeComparisonUseCase,
    @inject('ICodeGenerationUseCase') private codeGenerationUseCase: ICodeGenerationUseCase,
  ) {}

  verifyOauthRequest = async (
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    try {
      const authorizeRequestDTO = new AuthorizationRequestDTO({
        id: req.userId,
        ...req.query,
        ...req.body,
      });

      const address_uri =
        await this.clientsAuthorizationVerifierUseCase.execute(authorizeRequestDTO);
      req.session.address_uri = address_uri;
    } catch (error) {
      next(error);
    }
    next();
  };

  compareScope = async (
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> => {
    const { client_id, scope, redirect_uri, state } = req.query;

    try {
      const scopeRequestDTO = new ScopeRequestDTO({
        id: req.userId,
        client_id,
        scope,
      });

      const { scope: comparedScope, isUpdated } =
        await this.clientsScopeComparisonUseCase.execute(scopeRequestDTO);

      if (!isUpdated) {
        const codeGenerateRequestDTO = new CodeGenerationRequestDTO({
          id: req.userId,
          redirect_uri,
          client_id,
        });

        const { code } = await this.codeGenerationUseCase.execute(codeGenerateRequestDTO);

        return res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
      }

      Object.assign(req.session, {
        scope: comparedScope,
        isUpdated,
        redirect_uri,
        client_id,
        state,
      });

      return res.render('oauth/consent', {
        scope: comparedScope,
        updated: isUpdated,
        translations: TRANSLATIONS_SCOPE,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ClientsVerifierController;
