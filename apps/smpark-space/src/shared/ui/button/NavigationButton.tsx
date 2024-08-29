'use client';

import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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

  const getIcon = (): IconDefinition => {
    return type === 'back' ? faArrowLeft : faHome;
  };

  const getAriaLabel = (): string => {
    return type === 'back' ? 'go back' : 'go home';
  };

  return (
    <button
      className='w-full h-full flex items-center justify-center cursor-pointer p-[15px] text-lg'
      onClick={handleNavigation}
      aria-label={getAriaLabel()}
      onKeyDown={(e) => e.key === 'Enter' && handleNavigation()}
      type='button'
    >
      <FontAwesomeIcon icon={getIcon()} />
    </button>
  );
};
