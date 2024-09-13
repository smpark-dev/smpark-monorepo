'use client';

import Image from 'next/image';
import React, { useEffect, useRef } from 'react';

import { RocketGuide } from '@/pages/portfolio/services';
import { useLayoutStore } from '@/shared/model';
import { Logo } from '@/shared/ui';

export const PortfolioHeader = () => {
  const containerRef = useLayoutStore((state) => state.containerRef);
  const guideRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { setHeaderRef } = useLayoutStore();

  useEffect(() => {
    if (headerRef.current) {
      setHeaderRef(headerRef);
    }
  }, [setHeaderRef]);

  useEffect(() => {
    if (containerRef && containerRef.current && guideRef.current) {
      const rocketGuide = new RocketGuide(guideRef.current, containerRef.current);
      rocketGuide.start();

      return () => {
        rocketGuide.end();
      };
    }

    return undefined;
  }, [containerRef]);

  return (
    <header className='sticky top-0 w-full h-28 select-none z-10' ref={headerRef}>
      <nav className='w-full h-full flex z-10 bg-transparency-secondary'>
        <Logo />
        <div
          className='w-[70%] flex justify-between items-center relative mr-[15% max-md:hidden'
          data-id='guide'
          ref={guideRef}
        >
          <Image src='imgs/earth.webp' alt='지구 표시' width={50} height={50} data-id='earth' />
          <Image
            src='/imgs/space_ship.webp'
            alt='우주선 표시'
            width={50}
            height={30}
            data-id='rocket'
            className='absolute left-[50px]'
            unoptimized
          />

          <Image src='imgs/mars.webp' alt='화성 표시' width={50} height={50} data-id='mars' />
        </div>
      </nav>
    </header>
  );
};
