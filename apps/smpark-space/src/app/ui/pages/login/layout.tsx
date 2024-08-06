'use client';
import Navbar from 'apps/smpark-space/src/app/ui/components/auth/Navbar';
import styles from './layout.module.css';
import { josefinSans } from 'apps/smpark-space/src/app/styles/font';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.container}>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <footer>
        <p className={`${styles.footerText}  ${josefinSans.className}`}>
          2024 software engineer smpark - All rights reserved
        </p>
      </footer>
    </div>
  );
};
export default LoginLayout;
