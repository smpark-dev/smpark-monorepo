'use client';

import React, { useEffect, useRef } from 'react';

import { useLayoutStore } from '@/shared/model';

import { About } from './about/About';
import { Contact } from './contact/Contact';
import { Home } from './home/Home';
import { Skills } from './skills/Skills';
import { Work } from './work/Work';

export const PortfolioMain = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const setMainRef = useLayoutStore((state) => state.setMainRef);

  useEffect(() => {
    if (mainRef.current) {
      setMainRef(mainRef);
    }
  }, [setMainRef]);

  return (
    <main id='main-content' ref={mainRef}>
      <Home />
      <About />
      <Skills />
      <Work />
      <Contact />
    </main>
  );
};
