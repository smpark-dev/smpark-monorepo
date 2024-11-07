import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export const authMiddleware = async (req: NextRequest) => {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  // path외 정적파일 경로가 나타남에 필터링
  const staticPaths = [
    '/_next', // Next.js 정적 파일
    '/imgs', // 이미지 파일 경로
    '/favicon.ico', // Favicon 파일 경로
    '/api/auth',
    '/sitemap.xml',
    '/robots.txt',
  ];
  if (staticPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  if (!token) {
    if (pathname === '/' || pathname === '/login') {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
};
