import { NextRequest } from 'next/server';

import { authMiddleware } from '@/shared/middleware';

export async function middleware(req: NextRequest) {
  // 인증 미들웨어 적용
  const response = await authMiddleware(req);

  // 인증이 성공하면 (response.ok가 true이면) nonce 미들웨어 적용
  // if (response.ok) {
  //   response = nonceMiddleware(req);
  // }

  return response;
}

// 특정 경로에 대해 미들웨어 적용
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
