'use client';
import React from 'react';
import styles from './home.module.css';
import Image from 'next/image';
import { josefinSans } from '@/app/styles/font';

const Home = () => (
  <section id='home' className={`portfolioSection ${styles.home} ${josefinSans.className}`}>
    <h1 className={styles.title}>
      {"smpark's portfolio"} <br />
    </h1>
    <Image src='/imgs/smpark.jpg' alt='owner' width={243} height={300} className={styles.smparkImg} priority />

    <h3 className={styles.dscription}>
      Hello, <br />
      Welcome to my space <br />
      Have a nice trip
    </h3>
  </section>
);

export default Home;
