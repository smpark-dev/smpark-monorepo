import { Footer } from '@/shared/ui';

import { PortfolioWrapper } from './PortfolioWrapper';

import { PortfolioMain, PortfolioAside, PortfolioHeader } from './index';

const PortfolioPage = () => {
  return (
    <PortfolioWrapper>
      <PortfolioHeader />
      <PortfolioAside />
      <PortfolioMain />
      <Footer />
    </PortfolioWrapper>
  );
};

export default PortfolioPage;
