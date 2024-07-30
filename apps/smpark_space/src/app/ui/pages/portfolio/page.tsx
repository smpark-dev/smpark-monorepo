import React from 'react';
import type { Metadata } from 'next';
import Sections from '@/app/ui/components/portfolio/sections/Article';

export const metadata: Metadata = {
  title: "smpark's portfolio",
  description: 'smpark의 포트폴리오 페이지입니다. 소개, 스킬, 경력 등을 알 수 있어요. :)',
};

const PortfolioPage = () => {
  return <Sections />;
};

export default PortfolioPage;
