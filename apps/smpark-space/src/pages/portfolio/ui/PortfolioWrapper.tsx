'use client';

import React, { useEffect, useRef } from 'react';

import { useLayoutStore } from '@/shared/model';

export const PortfolioWrapper = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setContainerRef } = useLayoutStore();

  useEffect(() => {
    if (containerRef.current) {
      setContainerRef(containerRef);
    }
  }, [setContainerRef]);

  return (
    <div className='h-screen overflow-y-scroll overflow-x-hidden' ref={containerRef}>
      {children}
    </div>
  );
};
