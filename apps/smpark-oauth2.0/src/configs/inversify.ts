import { Container } from 'inversify';

import UserAuthenticationService from '@app-services/auth/UserAuthenticationService';
import UserRegistrationService from '@app-services/auth/UserRegistrationService';
import UserScopeUpdaterService from '@app-services/auth/UserScopeUpdaterService';
import ClientsGenerationService from '@app-services/clients/ClientsGenerationService';
import ClientsLoadService from '@app-services/clients/ClientsLoadService';
import ClientsOAuthRequestValidService from '@app-services/clients/ClientsOAuthRequestValidService';
import ClientsOAuthValidService from '@app-services/clients/ClientsOAuthValidService';
import ClientsOAuthVerifierService from '@app-services/clients/ClientsOAuthVerifierService';
import ClientsRegisterService from '@app-services/clients/ClientsRegisterService';
import ClientsScopeValidationService from '@app-services/clients/ClientsScopeSelectionService';
import ClientsVerifierService from '@app-services/clients/ClientsVerifierService';
import CodeGenerationService from '@app-services/code/CodeGenerationService';
import CodeValidateService from '@app-services/code/CodeValidateService';
import TokenIssuanceLoginService from '@app-services/token/TokenIssuanceLoginService';
import TokenIssuanceOAuthService from '@app-services/token/TokenIssuanceOAuthService';
import TokenPrepareService from '@app-services/token/TokenPrepareService';
import env from '@configs/env';
import AuthenticationController from '@controllers/AuthenticationController';
import ClientsController from '@controllers/ClientsController';
import OAuthController from '@controllers/OAuthController';
import MongoDB from '@database/MongoDB';
import Redis from '@database/Redis';
import ClientService from '@domain-services/ClientService';
import CodeService from '@domain-services/CodeService';
import TokenService from '@domain-services/TokenService';
import UserService from '@domain-services/UserService';
import CookieHandler from '@infra-handlers/CookieHandler';
import JWTService from '@infra-services/JWTService';
import ClientsMapper from '@mapper/ClientsMapper';
import CodeMapper from '@mapper/CodeMapper';
import OAuthMapper from '@mapper/OAuthMapper';
import TokenMapper from '@mapper/TokenMapper';
import UserMapper from '@mapper/UserMapper';
import AuthenticationMiddleware from '@middleware/routeMiddleware/AuthenticationMiddleware';
import ClientsRepository from '@repository/ClientsRepository';
import CodeRepository from '@repository/CodeRepository';
import MongoTokenRepository from '@repository/MongoTokenRepository';
import RedisTokenRepository from '@repository/RedisTokenRepository';
import UserRepository from '@repository/UserRepository';
import UserLoginUseCase from '@usecases/auth/UserLoginUseCase';
import UserRegistrationUseCase from '@usecases/auth/UserRegistrationUseCase';
import UserScopeUpdaterUseCase from '@usecases/auth/UserScopeUpdaterUseCase';
import ClientDetailsLoaderUseCase from '@usecases/clients/ClientDetailsLoaderUseCase';
import ClientDetailsRegistrationUseCase from '@usecases/clients/ClientDetailsRegistrationUseCase';
import ClientGenerationUseCase from '@usecases/clients/ClientGenerationUseCase';
import ClientsRequestValidUseCase from '@usecases/clients/ClientsRequestValidUseCase';
import ClientsScopeValidationUseCase from '@usecases/clients/ClientsScopeValidationUseCase';
import CodeGenerationUseCase from '@usecases/code/CodeGenerationUseCase';
import TokenIssuanceOauthUseCase from '@usecases/token/TokenIssuanceOauthUseCase';
import TokenPreparationUseCase from '@usecases/token/TokenPreparationUseCase';

const container = new Container();

const registerUseCaseDependencies = (): void => {
  container.bind('ITokenIssuanceOauthUseCase').to(TokenIssuanceOauthUseCase);
  container.bind('IClientGenerationUseCase').to(ClientGenerationUseCase);
  container.bind('ICodeGenerationUseCase').to(CodeGenerationUseCase);
  container.bind('IClientsScopeValidationUseCase').to(ClientsScopeValidationUseCase);
  container.bind('ITokenPreparationUseCase').to(TokenPreparationUseCase);
  container.bind('IUserScopeUpdaterUseCase').to(UserScopeUpdaterUseCase);
  container.bind('IUserLoginUseCase').to(UserLoginUseCase);
  container.bind('IUserRegistrationUseCase').to(UserRegistrationUseCase);
  container.bind('IClientDetailsLoaderUseCase').to(ClientDetailsLoaderUseCase);
  container.bind('IClientDetailsRegistrationUseCase').to(ClientDetailsRegistrationUseCase);
  container.bind('IClientsRequestValidUseCase').to(ClientsRequestValidUseCase);
};

const registerAppServiceDependencies = (): void => {
  container.bind('IUserAuthenticationService').to(UserAuthenticationService);
  container.bind('IUserRegistrationService').to(UserRegistrationService);
  container.bind('IUserScopeUpdaterService').to(UserScopeUpdaterService);
  container.bind('IClientsGenerationService').to(ClientsGenerationService);
  container.bind('IClientsLoadService').to(ClientsLoadService);
  container.bind('IClientsOAuthRequestValidService').to(ClientsOAuthRequestValidService);
  container.bind('IClientsOAuthValidService').to(ClientsOAuthValidService);
  container.bind('IClientsOAuthVerifierService').to(ClientsOAuthVerifierService);
  container.bind('IClientsRegisterService').to(ClientsRegisterService);
  container.bind('IClientsVerifierService').to(ClientsVerifierService);
  container.bind('IClientsScopeValidationService').to(ClientsScopeValidationService);
  container.bind('ITokenIssuanceLoginService').to(TokenIssuanceLoginService);
  container.bind('ITokenIssuanceOAuthService').to(TokenIssuanceOAuthService);
  container.bind('ITokenPrepareService').to(TokenPrepareService);
  container.bind('ICodeGenerationService').to(CodeGenerationService);
  container.bind('ICodeValidateService').to(CodeValidateService);
};

const registerDomainServiceDependencies = (): void => {
  container.bind('IClientService').to(ClientService);
  container.bind('IUserService').to(UserService);
  container.bind('ICodeService').to(CodeService);
  container.bind('ITokenService').to(TokenService);
};

const registerInfraServiceDependencies = (): void => {
  container.bind('ITokenManagementService').to(JWTService);
};

const registerRepositoryDependencies = (): void => {
  container.bind('ICodeRepository').to(CodeRepository);
  container.bind('IMongoTokenRepository').to(MongoTokenRepository);
  container.bind('IUserRepository').to(UserRepository);
  container.bind('IClientsRepository').to(ClientsRepository);
  container.bind('IRedisTokenRepository').to(RedisTokenRepository);
  container.bind('ICookieHandler').to(CookieHandler);
};

const registerControllerDependencies = (): void => {
  container.bind('IAuthenticationController').to(AuthenticationController);
  container.bind('IClientsController').to(ClientsController);
  container.bind('IOAuthController').to(OAuthController);
};

const registerMongoDependencies = (dbURL: string, dbName: string): void => {
  container.bind('DbURL').toConstantValue(dbURL);
  container.bind('DbName').toConstantValue(dbName);
  container.bind(MongoDB).toSelf().inSingletonScope();
};

const registerRedisDependencies = (redisURL: string): void => {
  container.bind('RedisURL').toConstantValue(redisURL);
  container.bind(Redis).toSelf().inSingletonScope();
};

const registerEnvDependencies = (): void => {
  container.bind('env').toConstantValue(env);
};

const registerMiddlewareDependencies = (): void => {
  container.bind('IAuthenticationMiddleware').to(AuthenticationMiddleware);
};

const registerMapperDependencies = (): void => {
  container.bind(ClientsMapper).to(ClientsMapper);
  container.bind(UserMapper).to(UserMapper);
  container.bind(CodeMapper).to(CodeMapper);
  container.bind(OAuthMapper).to(OAuthMapper);
  container.bind(TokenMapper).to(TokenMapper);
};

const registerAllDependencies = (dbURL: string, dbName: string, redisURL: string): void => {
  registerControllerDependencies();
  registerEnvDependencies();
  registerMapperDependencies();
  registerMiddlewareDependencies();
  registerMongoDependencies(dbURL, dbName);
  registerRedisDependencies(redisURL);
  registerRepositoryDependencies();
  registerDomainServiceDependencies();
  registerAppServiceDependencies();
  registerInfraServiceDependencies();
  registerUseCaseDependencies();
};

export { container, registerAllDependencies };
