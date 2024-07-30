import React from 'react';
import PortfolioLayout from './portfolio/layout';
import PortfolioPage from './portfolio/page';

const HomePage = () => {
  return (
    <PortfolioLayout>
      <PortfolioPage />
    </PortfolioLayout>
  );
};

export default HomePage;
