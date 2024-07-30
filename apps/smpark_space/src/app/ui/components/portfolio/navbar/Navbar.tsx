'use client';
import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Logo from '@/app/ui/components/common/logo/Logo';
import styles from './navbar.module.css';
import RocketGuide from '@/app/utils/services/rocket_guide/rocket_guide';
import { usePortfolioStore } from '@/app/stores/portfoiloStore';

const PortfolioNavbar = () => {
  const containerRef = usePortfolioStore((state) => state.containerRef);
  const guideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef && containerRef.current && guideRef.current) {
      const rocketGuide = new RocketGuide(guideRef.current, containerRef.current);
      rocketGuide.start();
    }
  }, [containerRef]);

  return (
    <nav className={styles.navbar}>
      <Logo />
      <div className={styles.guide} data-id='guide' ref={guideRef}>
        <Image src='/imgs/earth.png' alt='earth' width={50} height={50} data-id='earth' />
        <Image
          src='/imgs/space_ship.gif'
          alt='spaceShip'
          width={50}
          height={30}
          data-id='rocket'
          className={styles.rocket}
          unoptimized
        />
        <Image src='/imgs/mars.png' alt='mars' width={50} height={50} data-id='mars' />
      </div>
    </nav>
  );
};

export default PortfolioNavbar;
