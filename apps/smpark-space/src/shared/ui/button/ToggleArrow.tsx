'use client';

import React, { useState } from 'react';

import { useHandleEnter } from '@/shared/model';

import { Button } from './Button';

interface IToggleArrowProps {
  title: string;
  toggleDefault?: boolean;
  children?: React.ReactNode;
}

export const ToggleArrow = ({ title = '', toggleDefault = false, children }: IToggleArrowProps) => {
  const [isOpen, setIsOpen] = useState(toggleDefault);
  const changeToggle = () => setIsOpen(!isOpen);
  const handleEnter = useHandleEnter(changeToggle, true);

  return (
    <div className={`mt-[10px] ${isOpen ? 'h-full' : 'h-10'}`}>
      <div className='block'>
        <Button
          className='flex items-center cursor-pointer w-fit'
          onClick={changeToggle}
          onKeyDown={handleEnter}
          aria-expanded={isOpen}
        >
          <h1 className='text-5'>{title}</h1>
          <div
            className={`w-0 h-0 border-solid border-y-[8px] border-r-[11px] border-l-0 border-transparent border-r-white mr-[60px] ml-[10px] ${isOpen ? '-rotate-90' : 'rotate-180'}`}
            aria-hidden='true'
          />
        </Button>
        {isOpen && <div className='h-full'>{children}</div>}
      </div>
    </div>
  );
};
