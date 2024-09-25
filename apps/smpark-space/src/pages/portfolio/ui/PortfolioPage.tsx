import { Footer } from '@/shared/ui';

import { PortfolioMain, PortfolioAside, PortfolioHeader } from './index';

const PortfolioPage = () => {
  return (
    <>
      <PortfolioHeader />
      <PortfolioAside />
      <PortfolioMain />
      <Footer />
    </>
  );
};

export default PortfolioPage;
