'use client';

import { useRouter, usePathname } from 'next/navigation';

import { Button } from '@/shared/ui/button';

export const Logo = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (pathname === '/') {
      window.location.reload();
    } else {
      router.push('/');
    }
  };

  return (
    <div className='flex items-center justify-center py-2.5 pl-2.5 w-[15%] h-full max-md:w-max  hover:text-secondary'>
      <Button
        className='text-start max-md:p-0 font-inconsolata leading-[30px] tracking-[0.5rem] font-bold uppercase text-lg max-md:text-sm max-md:leading-[25px] max-lg:text-sm max-lg:tracking-[0.35rem] max-lg:leading-[25px]'
        onClick={handleLogoClick}
      >
        web <br />
        developer <br />
        smpark
      </Button>
    </div>
  );
};
