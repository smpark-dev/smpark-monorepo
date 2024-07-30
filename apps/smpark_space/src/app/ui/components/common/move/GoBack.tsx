// src/app/ui/components/common/Goback.tsx

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { GoBackProps } from '@/types/ui/common/move';
import styles from './goBack.module.css';

const GoBack = ({ move }: GoBackProps) => {
  const router = useRouter();

  const handleGoBack = () => {
    if (move) {
      router.push(move);
    } else {
      router.back();
    }
  };

  return (
    <div className={styles.container} onClick={handleGoBack}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </div>
  );
};

export default GoBack;
