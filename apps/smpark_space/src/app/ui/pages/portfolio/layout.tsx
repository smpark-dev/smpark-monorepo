'use client';
import Navbar from '@/app/ui/components/portfolio/navbar/Navbar';
import Menu from '@/app/ui/components/portfolio/aside/Menu';
import styles from './layout.module.css';
import { usePortfolioStore } from '@/app/stores/portfoiloStore';
import { useEffect, useRef } from 'react';
import { josefinSans } from '@/app/styles/font';

const PortfolioLayout = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const setContainerRef = usePortfolioStore((state) => state.setContainerRef);

  useEffect(() => {
    if (containerRef.current) {
      setContainerRef(containerRef);
    }
  }, [containerRef, setContainerRef]);

  return (
    <div className={styles.container} ref={containerRef}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <aside className={styles.aside}>
        <Menu />
      </aside>
      <main>{children}</main>
      <footer>
        <p className={`${styles.footerText} ${josefinSans.className}`}>
          2024 software engineer smpark - All rights reserved
        </p>
      </footer>
    </div>
  );
};
export default PortfolioLayout;
