'use client';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState, useCallback } from 'react';

import { useAsideStore } from '@/pages/portfolio/model';
import { HighlightMenu } from '@/pages/portfolio/services';
import { useLayoutStore } from '@/shared/model';
import { Button } from '@/shared/ui';

import { Navigation } from './Navigation';

export const PortfolioAside = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const mainRef = useLayoutStore((state) => state.mainRef);
  const { isToggle, toggleAside } = useAsideStore();

  const onObserveTarget = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  const toggleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleAside();
  };

  useEffect(() => {
    if (mainRef?.current) {
      const sections: Element[] = Array.from(mainRef.current.children);
      const highlightMenu = new HighlightMenu(sections, onObserveTarget);
      highlightMenu.on();

      return () => {
        highlightMenu.off();
      };
    }
    return undefined;
  }, [mainRef, onObserveTarget]);

  return (
    <aside
      className={`py-[30px] flex w-[15%] h-full z-20 select-none float-right sticky top-0 bottom-0 right-0 max-md:items-center max-md:flex-col
    ${
      isToggle
        ? 'max-md:p-0 max-md:h-full max-md:justify-center max-md:pt-[calc((112px-50px)/2)]'
        : 'max-md:my-0 max-md:h-[112px] max-md:top-[calc((112px-50px)/2)] max-md:justify-start max-md:p-0 max-md:-mt-[112px]'
    }`}
      aria-label='Menu'
    >
      <Button
        className={`${isToggle ? 'max-md:min-h-[50px]' : ''} text-sm hidden mx-auto w-[30px] justify-center flex-col basis-[10%] max-md:flex max-md:w-[50px] max-md:items-center max-md:basis-[50px] max-md:m-0 max-md:p-0`}
        aria-label='navigation'
        onClick={toggleMenu}
      >
        <FontAwesomeIcon icon={faBars} className='h-4' />
      </Button>

      <Navigation activeSection={activeSection} />
    </aside>
  );
};