import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "smpark's space",
  description: 'smpark의 개인 웹페이지 입니다.',
  keywords: ['Web', 'App', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  metadataBase: new URL('http://localhost:3000'),
  openGraph: {
    title: "smpark's space",
    description: 'smpark의 포트폴리오 페이지입니다. 소개, 스킬, 경력 등을 알 수 있어요. :)',
    images: [
      {
        url: '/imgs/smpark2.webp',
        width: 243,
        height: 300,
        alt: '제작자가 앉아있는 모습',
      },
    ],
  },
};

export { default } from '@/pages/portfolio';
