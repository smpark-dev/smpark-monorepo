import ClientsRepository from '@repository/UserRepository';
import createError from 'http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';

type scope = {
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
): Promise<Partial<scope>> => {
  const decoded = verifyToken<JwtPayload>(token, secretKey);
  if (!decoded.sub) {
    throw createError(500, 'decoded.sub 누락');
  }

  const userInfo = await client.findById(decoded.sub);

  if (!userInfo) {
    throw createError(500, 'DB 데이터 누락');
  }

  const resultScope: Partial<scope> = {};

  Object.keys(decoded.scope).forEach((key) => {
    if (decoded.scope[key]) {
      resultScope[key] = userInfo[key];
    }
  });

  return resultScope;
};
