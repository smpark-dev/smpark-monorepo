import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import { NextAuthOptions } from 'next-auth';
import { v4 as uuidv4 } from 'uuid';

const options: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: { params: { access_type: 'offline' } }, // 구글 Refresh Token 받기.
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
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
          client_id: process.env.SMPARK_CLIENT_ID,
          redirect_uri: process.env.SMPARK_CLIENT_REDIRECT_URI,
          response_type: 'code',
          state: uuidv4(),
          scope: 'openid name email',
        },
      },
      token: `${process.env.SMPARK_OAUTH_BASE_URI}/oauth/token`,
      clientId: process.env.SMPARK_CLIENT_ID,
      clientSecret: process.env.SMPARK_CLIENT_SECRET,
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
    strategy: 'jwt', // 기본값은 "jwt"
    maxAge: 8000, // 1분 (60초)로 세션 만료 시간 설정
  },
  callbacks: {
    async jwt({ token, account, profile, user }) {
      console.log('token', token);
      if (account) {
        if (account?.provider === 'google') {
          // Google 로그인 관련 로직
          console.log('Google login');
        } else if (account?.provider === 'github') {
          // GitHub 로그인 관련 로직
          console.log('GitHub login');
        } else if (account?.provider === 'guest') {
          // 게스트 로그인 관련 로직
          console.log('Guest login');
        } else if (account?.provider === 'smpark') {
          // smpark 로그인 관련 로직
          console.log('smpark login');
        } else {
          throw new Error('존재하지 않는 provider');
        }
        return {
          provider: account?.provider,
          access_token: account?.access_token,
          expires_at: account?.expires_at,
          refresh_token: account?.refresh_token,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
