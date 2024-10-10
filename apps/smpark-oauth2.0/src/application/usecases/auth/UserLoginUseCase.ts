import { injectable, inject } from 'inversify';

import { IUserLoginUseCase } from '@application-interfaces/usecases/IAuthUseCase';
import { LoginDTO } from '@dtos/UserDTO';
import UserMapper from '@mapper/UserMapper';

import type { IRedisTokenRepository } from '@domain-interfaces/repository/IRedisTokenRepository';
import type { IUserRepository } from '@domain-interfaces/repository/IUserRepository';
import type { IAuthenticationService } from '@domain-interfaces/services/IAuthenticationService';
import type { IOAuthVerifierService } from '@domain-interfaces/services/IOAuthVerifierService';
import type { ITokenService } from '@domain-interfaces/services/ITokenService';
import type { EnvConfig } from '@lib/dotenv-env';

@injectable()
class UserLoginUseCase implements IUserLoginUseCase {
  constructor(
    @inject('env') private env: EnvConfig,
    @inject(UserMapper) private userMapper: UserMapper,
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('ITokenService') private tokenService: ITokenService,
    @inject('IAuthenticationService') private authenticationService: IAuthenticationService,
    @inject('IOAuthVerifierService') private oAuthVerifierService: IOAuthVerifierService,
    @inject('IRedisTokenRepository')
    private redisTokenRepository: IRedisTokenRepository,
  ) {}

  async execute(loginDTO: LoginDTO): Promise<string> {
    const { id, password } = this.authenticationService.verifySignInInfo(loginDTO);
    const fetchedUser = await this.userRepository.findById(id);
    const verifiedUser = this.oAuthVerifierService.verifyUser(fetchedUser);
    const user = this.userMapper.toEntity(verifiedUser);
    await this.authenticationService.authenticate(user, password, verifiedUser.password);

    const loginPayload = { id: user.id, name: user.name, email: user.email };
    const accessToken = this.tokenService.generateToken(
      loginPayload,
      this.env.oauthAccessSecret,
      Number(this.env.oauthAccessTokenExpiresIn),
    );
    const refreshToken = this.tokenService.generateToken(
      loginPayload,
      this.env.oauthRefreshSecret,
      Number(this.env.oauthRefreshTokenExpiresIn),
    );

    const tokenType = 'refresh';
    const isSave = await this.redisTokenRepository.save(
      tokenType,
      id,
      refreshToken,
      Number(this.env.oauthRefreshTokenExpiresIn),
    );

    this.oAuthVerifierService.verifyOperation(isSave);

    return accessToken;
  }
}

export default UserLoginUseCase;
