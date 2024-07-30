import React from 'react';
import type { Metadata } from 'next';
import Login from '@/app/ui/components/auth/Login';

export const metadata: Metadata = {
  title: "smpark's portfolio",
  description: 'smpark의 로그인 페이지 입니다.',
};

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
