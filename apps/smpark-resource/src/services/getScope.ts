import createError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';

import ClientsRepository from '@repository/UserRepository';

type Scope = {
  id: string;
  email: string;
  name: string;
  [key: string]: string;
};

const verifyToken = <T>(token: string, jwtSecretKey: string): T => {
  return jwt.verify(token, jwtSecretKey) as T;
};

export const getScope = async (
  token: string,
  secretKey: string,
  client: ClientsRepository,
): Promise<Partial<Scope>> => {
  const decoded = verifyToken<JwtPayload>(token, secretKey);

  if (!decoded.sub) {
    throw createError(500, 'decoded.sub 누락');
  }

  const result = await client.findById(decoded.sub);

  if (!result) {
    throw createError(500, 'DB 데이터 누락');
  }

  const resultScope: Partial<Scope> = {};

  const userInfo: Record<string, string> = {
    id: result.id,
    email: result.email,
    name: result.name,
  };

  Object.keys(decoded.scope).forEach((key) => {
    if (decoded.scope[key]) {
      resultScope[key] = userInfo[key];
    }
  });

  return resultScope;
};
