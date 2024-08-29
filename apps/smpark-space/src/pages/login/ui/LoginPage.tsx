import { LoginButtons } from '@/features/auth';
import { Footer } from '@/shared/ui';
import { Header } from '@/widgets/header';

const LoginPage = () => {
  return (
    <div className='bg-transparency-primary w-[80%] absolute top-[50%] left-[45%] -translate-x-[45%] -translate-y-[50%]'>
      <Header />
      <main>
        <h1 className='text-center font-josefin text-5xl font-thin mt-0 mb-[45px] max-md:text-3xl max-md:mb-11 max-xs:text-2xl max-xs:tracking-[0.3rem] max-xxs:text-lg'>
          Login Page
        </h1>
        <LoginButtons />
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;
