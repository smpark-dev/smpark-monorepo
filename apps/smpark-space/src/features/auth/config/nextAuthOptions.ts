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
      authorization: { params: { access_type: 'offline' } },
    }),
    GitHub({
      clientId: process.env.SPACE_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.SPACE_GITHUB_CLIENT_SECRET as string,
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
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          id: user.id,
          provider: account.provider,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          expiresAt: account.expires_at,
        };
      }

      if (token.provider === 'smpark' && token.expiresAt && Date.now() >= Number(token.expiresAt)) {
        const credentials = Buffer.from(
          `${process.env.SPACE_SMPARK_CLIENT_ID}:${process.env.SPACE_SMPARK_CLIENT_SECRET}`,
        ).toString('base64');

        const response = await fetch(`${process.env.SMPARK_OAUTH_BASE_URI}/oauth/token`, {
          method: 'POST',
          headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'refresh_token',
            refresh_token: token.refreshToken || '',
          }),
        });

        const tokens = await response.json();

        return {
          ...token,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
          expiresAt: tokens.expires_at,
        };
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
        provider: token.provider,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    },
  },
};
