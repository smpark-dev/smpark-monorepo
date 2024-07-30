'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './goHome.module.css';

const GoHome = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container} onClick={handleGoHome}>
      <FontAwesomeIcon icon={faHome} />
    </div>
  );
};

export default GoHome;
