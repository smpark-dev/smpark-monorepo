import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "smpark's login",
  description: 'smpark의 로그인 페이지 입니다.',
  metadataBase: new URL('http://localhost:3000'),
};

export { default } from '@/pages/login';
