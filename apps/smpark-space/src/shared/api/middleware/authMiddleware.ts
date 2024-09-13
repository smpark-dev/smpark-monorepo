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

  // 사용자가 로그인하지 않은 경우
  if (!token) {
    // 홈 경로와 로그인 경로는 허용
    if (pathname === '/' || pathname === '/login') {
      return NextResponse.next();
    }
    // 다른 보호된 경로로 접근 시 로그인 페이지로 리디렉션
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 사용자가 로그인한 상태에서 로그인 페이지로 접근 시 홈 페이지로 리디렉션
  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // 그 외의 모든 경우 요청을 계속 처리
  return NextResponse.next();
};
