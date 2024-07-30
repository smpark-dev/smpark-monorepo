import React from 'react';
import Logo from '@/app/ui/components/common/logo/Logo';
import styles from './navbar.module.css';
import { josefinSans } from '@/app/styles/font';
import GoBack from '@/app/ui/components/common/move/GoBack';

const Navbar = () => {
  return (
    <header className={`${styles.header} ${josefinSans.className}`}>
      <Logo />
      <h1 className={`${styles.title} ${josefinSans.className}`}>Login Page</h1>
      <div className={styles.homeBox}>
        <GoBack />
      </div>
    </header>
  );
};

export default Navbar;
