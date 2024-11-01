import { Container } from 'inversify';

import ClientsCredentialsController from '@adapters/clients/controllers/ClientsCredentialsController';
import ClientsRegistrationController from '@adapters/clients/controllers/ClientsRegistrationController';
import ClientsVerifierController from '@adapters/clients/controllers/ClientsVerifierController';
import CodeGenerationController from '@adapters/code/controllers/CodeGenerationController';
import TokenGenerationController from '@adapters/token/controllers/TokenGenerationController';
import UserAuthorizationController from '@adapters/user/controllers/UserAuthorizationController';
import UserLoginController from '@adapters/user/controllers/UserLoginController';
import UserLogoutController from '@adapters/user/controllers/UserLogoutController';
import UserRegistrationController from '@adapters/user/controllers/UserRegistrationController';
import ClientsAuthorizationVerifierUseCase from '@application/clients/usecases/ClientsAuthorizationVerifierUseCase';
import ClientsCredentialsGenerationUseCase from '@application/clients/usecases/ClientsCredentialsGenerationUseCase';
import ClientsDetailsLoaderUseCase from '@application/clients/usecases/ClientsDetailsLoaderUseCase';
import ClientsDetailsRegistrationUseCase from '@application/clients/usecases/ClientsDetailsRegistrationUseCase';
import ClientsScopeComparisonUseCase from '@application/clients/usecases/ClientsScopeComparisonUseCase';
import CodeGenerationUseCase from '@application/code/usecases/CodeGenerationUseCase';
import TokenOAuthIssuanceUseCase from '@application/token/usecases/TokenOAuthIssuanceUseCase';
import TokenPreparationUseCase from '@application/token/usecases/TokenPreparationUseCase';
import UserAgreedScopeUpdaterUseCase from '@application/user/usecases/UserAgreedScopeUpdaterUseCase';
import UserLoginUseCase from '@application/user/usecases/UserLoginUseCase';
import UserRegistrationUseCase from '@application/user/usecases/UserRegistrationUseCase';
import ClientsAuthorizationValidationService from '@domain/clients/services/ClientsAuthorizationValidationService';
import ClientsCredentialGenerationService from '@domain/clients/services/ClientsCredentialGenerationService';
import ClientsCredentialsVerifierService from '@domain/clients/services/ClientsCredentialsVerifierService';
import ClientsCredentialValidationService from '@domain/clients/services/ClientsCredentialValidationService';
import ClientsDetailLoadService from '@domain/clients/services/ClientsDetailLoadService';
import ClientsDetailRegistrationService from '@domain/clients/services/ClientsDetailRegistrationService';
import ClientsScopeComparisonService from '@domain/clients/services/ClientsScopeComparisonService';
import ClientsScopeVerifierService from '@domain/clients/services/ClientsScopeVerifierService';
import CodeDeletionService from '@domain/code/services/CodeDeletionService';
import CodeGenerationService from '@domain/code/services/CodeGenerationService';
import CodeValidationService from '@domain/code/services/CodeValidationService';
import TokenAuthIssuanceService from '@domain/token/services/TokenAuthIssuanceService';
import TokenOAuthIssuanceService from '@domain/token/services/TokenOAuthIssuanceService';
import TokenPreparationService from '@domain/token/services/TokenPreparationService';
import TokenReissueService from '@domain/token/services/TokenReissueService';
import UserAuthenticationService from '@domain/user/services/UserAuthenticationService';
import UserRegistrationService from '@domain/user/services/UserRegistrationService';
import UserScopeUpdaterService from '@domain/user/services/UserScopeUpdaterService';
import env from '@infrastructure/configs/env';
import MongoDB from '@infrastructure/database/MongoDB';
import Redis from '@infrastructure/database/Redis';
import CookieHandler from '@infrastructure/handlers/CookieHandler';
import ClientsRepository from '@infrastructure/repository/ClientsRepository';
import CodeRepository from '@infrastructure/repository/CodeRepository';
import TokenRedisRepository from '@infrastructure/repository/TokenRedisRepository';
import TokenRepository from '@infrastructure/repository/TokenRepository';
import UserRepository from '@infrastructure/repository/UserRepository';
import Argon2PasswordService from '@infrastructure/services/Argon2PasswordService';
import EnvService from '@infrastructure/services/EnvService';
import UUIDv4Service from '@infrastructure/services/IUUIDv4Service';
import JsonWebTokenService from '@infrastructure/services/JsonWebTokenService';
import AuthBlockMiddleware from '@middleware/routeMiddleware/AuthBlockMiddleware';
import AuthenticationMiddleware from '@middleware/routeMiddleware/AuthenticationMiddleware';

const container = new Container();

const registerDomainServiceDependencies = (): void => {
  // clients
  container
    .bind('IClientsAuthorizationValidationService')
    .to(ClientsAuthorizationValidationService);
  container.bind('IClientsCredentialGenerationService').to(ClientsCredentialGenerationService);
  container.bind('IClientsCredentialsVerifierService').to(ClientsCredentialsVerifierService);
  container.bind('IClientsCredentialValidationService').to(ClientsCredentialValidationService);
  container.bind('IClientsDetailLoadService').to(ClientsDetailLoadService);
  container.bind('IClientsDetailRegistrationService').to(ClientsDetailRegistrationService);
  container.bind('IClientsScopeComparisonService').to(ClientsScopeComparisonService);
  container.bind('IClientsScopeVerifierService').to(ClientsScopeVerifierService);
  // code
  container.bind('ICodeDeletionService').to(CodeDeletionService);
  container.bind('ICodeGenerationService').to(CodeGenerationService);
  container.bind('ICodeValidationService').to(CodeValidationService);
  // token
  container.bind('ITokenAuthIssuanceService').to(TokenAuthIssuanceService);
  container.bind('ITokenOAuthIssuanceService').to(TokenOAuthIssuanceService);
  container.bind('ITokenPreparationService').to(TokenPreparationService);
  container.bind('ITokenReissueService').to(TokenReissueService);
  // user
  container.bind('IUserScopeUpdaterService').to(UserScopeUpdaterService);
  container.bind('IUserAuthenticationService').to(UserAuthenticationService);
  container.bind('IUserRegistrationService').to(UserRegistrationService);
};

const registerInfraServiceDependencies = (): void => {
  container.bind('IArgon2PasswordService').to(Argon2PasswordService);
  container.bind('IEnvService').to(EnvService);
  container.bind('IJsonWebTokenService').to(JsonWebTokenService);
  container.bind('IUUIDv4Service').to(UUIDv4Service);
  container.bind('ICookieHandler').to(CookieHandler);
  container.bind('env').toConstantValue(env);
};

const registerRepositoryDependencies = (): void => {
  // clients
  container.bind('IClientsRepository').to(ClientsRepository);
  // code
  container.bind('ICodeRepository').to(CodeRepository);
  // token
  container.bind('ITokenRepository').to(TokenRepository);
  container.bind('ITokenRedisRepository').to(TokenRedisRepository);
  // user
  container.bind('IUserRepository').to(UserRepository);
};

const registerUseCaseDependencies = (): void => {
  // clients
  container.bind('IClientsAuthorizationVerifierUseCase').to(ClientsAuthorizationVerifierUseCase);
  container.bind('IClientsCredentialsGenerationUseCase').to(ClientsCredentialsGenerationUseCase);
  container.bind('IClientsDetailsLoaderUseCase').to(ClientsDetailsLoaderUseCase);
  container.bind('IClientsDetailsRegistrationUseCase').to(ClientsDetailsRegistrationUseCase);
  container.bind('IClientsScopeComparisonUseCase').to(ClientsScopeComparisonUseCase);
  // code
  container.bind('ICodeGenerationUseCase').to(CodeGenerationUseCase);
  // token
  container.bind('ITokenOAuthIssuanceUseCase').to(TokenOAuthIssuanceUseCase);
  container.bind('ITokenPreparationUseCase').to(TokenPreparationUseCase);
  // user
  container.bind('IUserAgreedScopeUpdaterUseCase').to(UserAgreedScopeUpdaterUseCase);
  container.bind('IUserLoginUseCase').to(UserLoginUseCase);
  container.bind('IUserRegistrationUseCase').to(UserRegistrationUseCase);
};

const registerControllerDependencies = (): void => {
  // clients
  container.bind('IClientsCredentialsController').to(ClientsCredentialsController);
  container.bind('IClientsRegistrationController').to(ClientsRegistrationController);
  container.bind('IClientsVerifierController').to(ClientsVerifierController);
  // code
  container.bind('ICodeGenerationController').to(CodeGenerationController);
  // token
  container.bind('ITokenGenerationController').to(TokenGenerationController);
  // user
  container.bind('IUserAuthorizationController').to(UserAuthorizationController);
  container.bind('IUserLoginController').to(UserLoginController);
  container.bind('IUserLogoutController').to(UserLogoutController);
  container.bind('IUserRegistrationController').to(UserRegistrationController);
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

const registerEnvDependencies = (): void => {};

const registerMiddlewareDependencies = (): void => {
  container.bind('IAuthBlockMiddleware').to(AuthBlockMiddleware);
  container.bind('IAuthenticationMiddleware').to(AuthenticationMiddleware);
};

const registerAllDependencies = (dbURL: string, dbName: string, redisURL: string): void => {
  registerControllerDependencies();
  registerEnvDependencies();
  registerMiddlewareDependencies();
  registerMongoDependencies(dbURL, dbName);
  registerRedisDependencies(redisURL);
  registerRepositoryDependencies();
  registerDomainServiceDependencies();
  registerInfraServiceDependencies();
  registerUseCaseDependencies();
};

export { container, registerAllDependencies };
