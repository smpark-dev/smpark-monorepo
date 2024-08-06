import { injectable } from 'inversify';

import { TokenResponseDTO } from '@dtos/TokenDTO';

@injectable()
class TokenMapper {
  toTokenResponseDTO(tokenResponse: TokenResponseDTO): TokenResponseDTO {
    return new TokenResponseDTO(tokenResponse.accessToken, tokenResponse.refreshToken);
  }
}

export default TokenMapper;
