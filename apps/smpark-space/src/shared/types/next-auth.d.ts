import { DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string;
    provider?: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession['user'];
    accessToken?: string;
    refreshToken?: string;
    provider?: string;
  }
}
