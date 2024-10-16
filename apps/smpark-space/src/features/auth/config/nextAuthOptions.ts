import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { v4 as uuidv4 } from 'uuid';

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.SPACE_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.SPACE_GOOGLE_CLIENT_SECRET as string,
      authorization: { params: { access_type: 'offline' } }, // 구글 Refresh Token 받기.
    }),
    GitHub({
      clientId: process.env.SPACE_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.SPACE_GITHUB_CLIENT_SECRET as string,
      // 깃허브는 Refresh Token을 기본적으로 제공하지 않음.
    }),
    Credentials({
      id: 'guest',
      name: "Smpark's Guest",
      credentials: {},
      async authorize() {
        const uuid = uuidv4();
        const guestUser = {
          id: uuid,
          name: `Guest_${Date.now() + uuid.slice(0, 4)}`,
        };

        return guestUser;
      },
    }),
    {
      id: 'smpark',
      name: "Smpark's Oauth2.0",
      type: 'oauth',
      version: '2.0',
      authorization: {
        url: `${process.env.SMPARK_OAUTH_BASE_URI}/oauth/authorize`,
        params: {
          client_id: process.env.SPACE_SMPARK_CLIENT_ID,
          redirect_uri: process.env.SMPARK_CLIENT_REDIRECT_URI,
          response_type: 'code',
          state: uuidv4(),
          scope: 'openid name email',
        },
      },
      token: `${process.env.SMPARK_OAUTH_BASE_URI}/oauth/token`,
      clientId: process.env.SPACE_SMPARK_CLIENT_ID,
      clientSecret: process.env.SPACE_SMPARK_CLIENT_SECRET,
      checks: ['state'],
      idToken: false,
      userinfo: `${process.env.SMPARK_RESOURCE_BASE_URI}/auth/scope`,

      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
        };
      },
    },
  ],
  session: {
    strategy: 'jwt',
    maxAge: 8000,
  },
};
