import { NavigationButton, Logo } from '@/shared/ui';

export const Header = () => {
  return (
    <header className='w-full py-[10px] pr-[10px] pl-[30px] relative'>
      <Logo />
      <div className='absolute right-[15px] top-[15px] text-text w-11 h-[45px]'>
        <NavigationButton type='back' move='/' />
      </div>
    </header>
  );
};
