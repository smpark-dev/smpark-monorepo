import { useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import { NAVIGATION } from '@/pages/portfolio/constants';
import { useAsideStore } from '@/pages/portfolio/model';
import { MoveMenu } from '@/pages/portfolio/services';
import { useHandleEnter, useLayoutStore } from '@/shared/model';
import { Button, Loading } from '@/shared/ui';

interface INavigationProps {
  activeSection: string | null;
}

export const Navigation = ({ activeSection }: INavigationProps) => {
  const { headerRef, mainRef } = useLayoutStore();
  const { status } = useSession();
  const router = useRouter();
  const { isToggle } = useAsideStore();

  const executeMoveSection = (
    e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLElement>,
  ) => {
    const target = e.currentTarget;
    if (target.dataset.id) {
      const targetId = target.dataset.id;

      if (mainRef?.current && headerRef?.current) {
        const sections = Array.from(mainRef.current.children) as HTMLDivElement[];
        const moveMenu = new MoveMenu(targetId, sections, headerRef.current);
        moveMenu.start();
      }
    }
  };

  const handleEnter = useHandleEnter(executeMoveSection, true);

  return (
    <ul
      className={`${isToggle ? 'max-md:flex max-md:h-full max-md:justify-around' : 'max-md:hidden'} flex flex-col justify-between h-full items-center w-full relative max-md:animate-menu-slide`}
    >
      {NAVIGATION.map((item) => (
        <li className='w-full min-h-[50px] flex items-center' key={item.id}>
          <Button
            className={`w-full h-full text-lg max-md:text-sm font-bold md:hover:text-primary ${activeSection === item.id ? 'text-secondary' : ''} font-noto`}
            onClick={executeMoveSection}
            onKeyDown={handleEnter}
            data-id={item.id}
            aria-current={activeSection === item.id ? 'true' : 'false'}
          >
            {item.title}
          </Button>
        </li>
      ))}

      <li className='w-full min-h-[50px] flex items-center' key='auth-button'>
        {status === 'loading' && <Loading className='m-auto' width={50} height={50} />}
        {status === 'authenticated' && (
          <Button
            className='w-full h-full text-lg max-md:text-sm font-bold text-primary font-noto'
            onClick={() => signOut()}
          >
            Logout
          </Button>
        )}
        {status === 'unauthenticated' && (
          <Button
            className='w-full h-full flex justify-center items-center text-lg max-md:text-sm font-bold text-primary font-noto'
            onClick={() => router.push('/login')}
          >
            Login
          </Button>
        )}
      </li>
    </ul>
  );
};
