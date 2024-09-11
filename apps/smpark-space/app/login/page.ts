import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "smpark's login",
  description: 'smpark의 로그인 페이지 입니다.',
  metadataBase: new URL('https://smpark.dev'),
};

export { default } from '@/pages/login';
