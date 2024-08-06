import { NextRequest } from 'next/server';
import { authMiddleware } from './app/middleware/auth';

export async function middleware(req: NextRequest) {
  // 미들웨어 순차적으로 호출
  // let response = loggerMiddleware(req);
  let response = await authMiddleware(req);
  // if (response.next()) response = customMiddleware(req);

  return response;
}
// 특정 경로에 대해 미들웨어 적용
export const config = {
  matcher: '/:path*',
};
