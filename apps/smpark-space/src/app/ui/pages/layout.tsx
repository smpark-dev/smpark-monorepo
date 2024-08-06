'use client';
import '@/app/styles/globals.css';
import '@/app/styles/theme.css';
import { nanumGothicCoding } from 'apps/smpark-space/src/app/styles/font';
import StarryNightCanvas from 'apps/smpark-space/src/app/ui/components/common/background/StarryNightCanvas';
import { SessionProvider } from 'next-auth/react';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ko'>
      <head>
        <title>smpark&apos;s space</title>
        <meta name='description' content='smpark의 개인 웹페이지 입니다.' />
      </head>
      <body className={nanumGothicCoding.className}>
        <StarryNightCanvas />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
};
export default PortfolioLayout;
