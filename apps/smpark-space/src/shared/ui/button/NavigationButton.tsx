'use client';

import ArrayLeft from '@public/imgs/icons/arrow-left.svg';
import Home from '@public/imgs/icons/house.svg';
import { useRouter } from 'next/navigation';

interface INavigationButtonProps {
  type: 'back' | 'home';
  move?: string;
}

export const NavigationButton = ({ type, move }: INavigationButtonProps) => {
  const router = useRouter();

  const handleNavigation = () => {
    if (type === 'back') {
      if (move) {
        router.push(move);
      } else {
        router.back();
      }
    } else if (type === 'home') {
      router.push('/');
    }
  };

  const getAriaLabel = (): string => {
    return type === 'back' ? 'go back' : 'go home';
  };

  return (
    <button
      className='w-full h-full flex items-center justify-center cursor-pointer text-lg'
      onClick={handleNavigation}
      aria-label={getAriaLabel()}
      onKeyDown={(e) => e.key === 'Enter' && handleNavigation()}
      type='button'
    >
      {type === 'back' ? <ArrayLeft /> : <Home />}
    </button>
  );
};
