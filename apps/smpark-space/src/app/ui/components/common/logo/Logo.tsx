import React from 'react';
import styles from './logo.module.css';
import { Inconsolata } from 'next/font/google';

const inconsolata = Inconsolata({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const Logo = () => (
  <div className={`${styles.logo}`}>
    <a href='https://smpark.dev' className={`${inconsolata.className}`}>
      web <br />
      developer <br />
      smpark
    </a>
  </div>
);

export default Logo;
