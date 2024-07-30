'use client';
import React from 'react';
import styles from './login.module.css';
import { signIn } from 'next-auth/react';

const Login = () => {
  return (
    <ul className={styles.loginButtons}>
      <li onClick={() => signIn('google')}>
        <button>Google</button>
      </li>
      <li onClick={() => signIn('github')}>
        <button>Github</button>
      </li>
      <li onClick={() => signIn('smpark')}>
        <button>Smpark</button>
      </li>
      <li onClick={() => signIn('guest')}>
        <button>Guest</button>
      </li>
    </ul>
  );
};

export default Login;
