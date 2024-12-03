import { injectable } from 'inversify';

import BaseId from '@domain/shared/value-objects/BaseId';
import Token from '@domain/token/entities/Token';
import { ITokenCollection } from '@infrastructure/interfaces/collections/ITokenCollection';

@injectable()
class TokenMapper {
  static toDatabase(token: Token, id: string): ITokenCollection {
    return {
      id,
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

  static toId({ id }: ITokenCollection): BaseId {
    return BaseId.validate(id);
  }
}

export default TokenMapper;
