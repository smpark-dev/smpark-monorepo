'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

import { Button, Loading } from '@/shared/ui';

const loginProvider = ['Google', 'Github', 'Smpark', 'Guest'];

export const LoginButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState('');

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    setLoadingProvider(provider);
    await signIn(provider.toLowerCase());
  };

  return isLoading ? (
    <Loading width={269} height={269} className='mx-auto' />
  ) : (
    <ul className='text-center m-[15px]'>
      {loginProvider.map((provider) => (
        <li className='my-[15px] mx-auto max-w-[300px]' key={provider}>
          <Button
            className='hover:bg-secondary hover:border-[1px] hover:border-solid hover:border-primary text-lg select-none w-full text-center mx-auto p-[13px] border-[1px] border-solid border-primary rounded-[30px] cursor-pointer'
            onClick={() => handleSignIn(provider)}
            disabled={isLoading && loadingProvider !== provider}
          >
            {provider}
          </Button>
        </li>
      ))}
    </ul>
  );
};
