import { injectable, inject } from 'inversify';

import { LoginDTO } from '@dtos/UserDTO';

import type { IUserAuthenticationService } from '@application-interfaces/services/auth/IUserAuthenticationService';
import type { ITokenIssuanceLoginService } from '@application-interfaces/services/token/ITokenIssuanceLoginService';
import type { IUserLoginUseCase } from '@application-interfaces/usecases/IAuthUseCase';

@injectable()
class UserLoginUseCase implements IUserLoginUseCase {
  constructor(
    @inject('ITokenIssuanceLoginService')
    private tokenIssuanceLoginService: ITokenIssuanceLoginService,
    @inject('IUserAuthenticationService')
    private userAuthenticationService: IUserAuthenticationService,
  ) {}

  async execute(loginDTO: LoginDTO): Promise<string> {
    const { user, id } = await this.userAuthenticationService.authenticateUser(loginDTO);

    const accessToken = await this.tokenIssuanceLoginService.issueLoginTokens(user, id);

    return accessToken;
  }
}

export default UserLoginUseCase;
