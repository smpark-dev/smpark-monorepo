import { injectable, inject } from 'inversify';

import TokenIssuanceMapper from '@application/token/mapper/TokenIssuanceMapper';

import type {
  IUserLoginRequest,
  IUserLoginResponse,
  IUserLoginUseCase,
} from '@application/user/interfaces/usecases/IUserLoginUseCase';
import type { ITokenAuthIssuanceService } from '@domain/token/interfaces/services/ITokenAuthIssuanceService';
import type { IUserAuthenticationService } from '@domain/user/interfaces/services/IUserAuthenticationService';

@injectable()
class UserLoginUseCase implements IUserLoginUseCase {
  constructor(
    @inject('ITokenAuthIssuanceService')
    private tokenAuthIssuanceService: ITokenAuthIssuanceService,
    @inject('IUserAuthenticationService') private authenticationService: IUserAuthenticationService,
  ) {}

  async execute(userLoginRequest: IUserLoginRequest): Promise<IUserLoginResponse> {
    const user = await this.authenticationService.authenticateUser(userLoginRequest);
    const tokens = await this.tokenAuthIssuanceService.issueAuthToken(user);

    return TokenIssuanceMapper.toAuthTokens(tokens, user.id);
  }
}

export default UserLoginUseCase;
