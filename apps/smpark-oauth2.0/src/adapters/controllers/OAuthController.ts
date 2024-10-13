import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import { injectable, inject } from 'inversify';

import { ERROR_MESSAGES } from '@constants/errorMessages';
import { TRANSLATIONS } from '@constants/scopes';
import OAuthMapper from '@mapper/OAuthMapper';
import UserMapper from '@mapper/UserMapper';
import { authSerialize } from '@utils/serialize';

import type { IOAuthController } from '@adapters-interfaces/controllers/IOAuthController';
import type { CookieOptions, ICookieHandler } from '@adapters-interfaces/handlers/ICookieHandler';
import type {
  IUserLoginUseCase,
  IUserScopeUpdaterUseCase,
} from '@application-interfaces/usecases/IAuthUseCase';
import type {
  IClientsRequestValidUseCase,
  IClientsScopeValidationUseCase,
} from '@application-interfaces/usecases/IClientsUseCase';
import type { ICodeGenerationUseCase } from '@application-interfaces/usecases/ICodeUseCase';
import type {
  ITokenIssuanceOauthUseCase,
  ITokenPreparationUseCase,
} from '@application-interfaces/usecases/ITokenUseCase';
import type { IOauthRequest } from '@infra-interfaces/IOauthRequest';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class OAuthController implements IOAuthController {
  constructor(
    @inject('env') private env: EnvConfig,
    @inject(UserMapper) private userMapper: UserMapper,
    @inject(OAuthMapper) private oAuthMapper: OAuthMapper,
    @inject('IUserLoginUseCase') private userLoginUseCase: IUserLoginUseCase,
    @inject('ICodeGenerationUseCase') private codeGenerationUseCase: ICodeGenerationUseCase,
    @inject('ITokenIssuanceOauthUseCase')
    private tokenGenerationUseCase: ITokenIssuanceOauthUseCase,
    @inject('IUserScopeUpdaterUseCase') private userScopeUpdaterUseCase: IUserScopeUpdaterUseCase,
    @inject('IClientsRequestValidUseCase')
    private clientsRequestValidUseCase: IClientsRequestValidUseCase,
    @inject('ITokenPreparationUseCase') private tokenPreparationUseCase: ITokenPreparationUseCase,
    @inject('IClientsScopeValidationUseCase')
    private scopeComparatorUseCase: IClientsScopeValidationUseCase,
    @inject('ICookieHandler') private cookieHandler: ICookieHandler,
  ) {}

  async verifyOauthRequest(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    try {
      const authorizeRequestDTO = this.oAuthMapper.toAuthorizeRequestDTO({
        id: req.session.user?.id,
        ...req.query,
        ...req.body,
      });

      const address_uri = await this.clientsRequestValidUseCase.execute(authorizeRequestDTO);
      req.session.address_uri = address_uri;
    } catch (error) {
      next(error);
    }
    next();
  }

  async oAuthUserLogin(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const { id, password, client_id, redirect_uri, state, scope, response_type } = req.body;

    try {
      const loginDTO = this.userMapper.toLoginDTO(id, password);
      const accessToken = await this.userLoginUseCase.execute(loginDTO);

      const cookieOptions: CookieOptions = {
        name: 'smpark-auth',
        value: accessToken,
        maxAge: Number(this.env.loginCookieExpiresIn) * 1000,
      };

      this.cookieHandler.setCookie(res, cookieOptions);

      req.body = authSerialize(req.body, ['password']);

      return res.status(200).send({
        message: '로그인 성공',
        redirect: `/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&response_type=${response_type}`,
      });
    } catch (error) {
      return next(error);
    }
  }

  async compareScope(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const { client_id, scope, redirect_uri, state } = req.query;

    try {
      const scopeRequestDTO = this.oAuthMapper.toScopeRequestDTO({
        client_id,
        scope,
      });
      const { scope: comparedScope, updated } =
        await this.scopeComparatorUseCase.execute(scopeRequestDTO);

      console.log('state', state);
      Object.assign(req.session, {
        scope: comparedScope,
        updated,
        redirect_uri,
        state,
      });

      if (!updated) {
        return res.redirect('/oauth/consent');
      }

      return res.render('oauth/consent', {
        scope: comparedScope,
        updated,
        translations: TRANSLATIONS,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateUserAgreedScope(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    console.log(req.session);
    const { scope: agreedScope, updated } = req.session;
    const id = req.session.user?.id;

    try {
      const scopeRequestDTO = this.oAuthMapper.toScopeRequestDTO({ agreedScope, updated, id });
      await this.userScopeUpdaterUseCase.execute(scopeRequestDTO);

      next();
    } catch (error) {
      next(error);
    }
  }

  async verifyTokenRequest(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const authHeader = req.headers?.authorization;

    if (!authHeader || !authHeader.startsWith('Basic ')) {
      return next(createError(401, ERROR_MESSAGES.VALIDATION.FORMAT.AUTHENTICATION));
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [client_id, client_secret] = credentials.split(':');
    const tokenRequestDTO = this.oAuthMapper.toTokenRequestDTO({
      ...req.body,
      client_id,
      client_secret,
    });
    try {
      req.session.codeValidatedIds = await this.tokenPreparationUseCase.execute(tokenRequestDTO);
      next();
    } catch (error) {
      next(error);
    }
  }

  async generateCode(
    req: IOauthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const id = req.session.user?.id;

    try {
      const { redirect_uri, state } = req.session;
      const code = await this.codeGenerationUseCase.execute(id);

      return res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
    } catch (error) {
      next(error);
    }
  }

  async generateAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response> {
    const ids = req.session.codeValidatedIds;

    try {
      const tokens = await this.tokenGenerationUseCase.execute(ids);

      return res.json({
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
        token_type: 'Bearer',
      });
    } catch (error) {
      next(error);
    }
  }

  disagree(req: Request, res: Response, next: NextFunction): void {
    const { address_uri } = req.session;
    if (address_uri) {
      res.redirect(address_uri);
    } else {
      next(createError(400, ERROR_MESSAGES.VALIDATION.MISSING.ADDRESS_URI));
    }
  }
}

export default OAuthController;
