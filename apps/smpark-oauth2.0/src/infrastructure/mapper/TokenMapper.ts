import { injectable } from 'inversify';

import Token from '@domain/token/entities/Token';
import { ITokenCollection } from '@infrastructure/interfaces/collections/ITokenCollection';

@injectable()
class TokenMapper {
  static toDatabase(token: Token): ITokenCollection {
    return {
      tokenId: token.tokenId.getValue(),
      accessToken: token.accessToken.getValue(),
      refreshToken: token.refreshToken.getValue(),
      tokenGrantedScopes: token.tokenGrantedScopes.getValue(),
    };
  }

  static toEntity({
    tokenId,
    accessToken,
    refreshToken,
    tokenGrantedScopes,
  }: ITokenCollection): Token {
    return Token.create({ tokenId, accessToken, refreshToken, tokenGrantedScopes });
  }
}

export default TokenMapper;
