import { Container } from 'inversify';

import env from '@configs/env';
import AuthenticationController from '@controllers/AuthenticationController';
import ClientsController from '@controllers/ClientsController';
import OAuthController from '@controllers/OAuthController';
import MongoDB from '@database/MongoDB';
import Redis from '@database/Redis';
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
import AuthenticationService from '@services/AuthenticationService';
import ClientsService from '@services/ClientsService';
import CodeService from '@services/CodeService';
import OAuthRequestValidService from '@services/OAuthRequestValidService';
import OAuthVerifierService from '@services/OAuthVerifierService';
import TokenService from '@services/TokenService';
import UserLoginUseCase from '@usecases/auth/UserLoginUseCase';
import UserRegistrationUseCase from '@usecases/auth/UserRegistrationUseCase';
import ClientDetailsLoaderUseCase from '@usecases/clients/ClientDetailsLoaderUseCase';
import ClientDetailsRegistrationUseCase from '@usecases/clients/ClientDetailsRegistrationUseCase';
import ClientGenerationUseCase from '@usecases/clients/ClientGenerationUseCase';
import CodeGenerationUseCase from '@usecases/oauth/CodeGenerationUseCase';
import ScopeComparatorUseCase from '@usecases/oauth/ScopeComparatorUseCase';
import TokenPreparationUseCase from '@usecases/oauth/TokenPreparationUseCase';
import UserAuthorizationUseCase from '@usecases/oauth/UserAuthorizationUseCase';
import UserScopeUpdaterUseCase from '@usecases/oauth/UserScopeUpdaterUseCase';
import TokenGenerationUseCase from '@usecases/token/TokenGenerationUseCase';

const container = new Container();

const registerUseCaseDependencies = (): void => {
  container.bind('ITokenGenerationUseCase').to(TokenGenerationUseCase);
  container.bind('IClientGenerationUseCase').to(ClientGenerationUseCase);
  container.bind('ICodeGenerationUseCase').to(CodeGenerationUseCase);
  container.bind('IScopeComparatorUseCase').to(ScopeComparatorUseCase);
  container.bind('ITokenPreparationUseCase').to(TokenPreparationUseCase);
  container.bind('IUserAuthorizationUseCase').to(UserAuthorizationUseCase);
  container.bind('IUserLoginUseCase').to(UserLoginUseCase);
  container.bind('IUserRegistrationUseCase').to(UserRegistrationUseCase);
  container.bind('IUserScopeUpdaterUseCase').to(UserScopeUpdaterUseCase);
  container.bind('IClientDetailsLoaderUseCase').to(ClientDetailsLoaderUseCase);
  container.bind('IClientDetailsRegistrationUseCase').to(ClientDetailsRegistrationUseCase);
};

const registerServiceDependencies = (): void => {
  container.bind('IAuthenticationService').to(AuthenticationService);
  container.bind('IOAuthRequestValidService').to(OAuthRequestValidService);
  container.bind('IClientsService').to(ClientsService);
  container.bind('ICodeService').to(CodeService);
  container.bind('IOAuthVerifierService').to(OAuthVerifierService);
  container.bind('ITokenService').to(TokenService);
};

const registerRepositoryDependencies = (): void => {
  container.bind('ICodeRepository').to(CodeRepository);
  container.bind('IMongoTokenRepository').to(MongoTokenRepository);
  container.bind('IUserRepository').to(UserRepository);
  container.bind('IClientsRepository').to(ClientsRepository);
  container.bind('IRedisTokenRepository').to(RedisTokenRepository);
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
  registerServiceDependencies();
  registerUseCaseDependencies();
};

export { container, registerAllDependencies };
