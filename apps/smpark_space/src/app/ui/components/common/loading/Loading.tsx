import React from 'react';
import Image from 'next/image';
import { LoadingProps } from '@/types/ui/common/loading';
import styles from './loading.module.css';

const Loading = ({ width, height, containerHeight }: LoadingProps) => {
  return (
    <div style={{ height: `${containerHeight}px` || 'auto' }}>
      <Image
        className={styles.loading}
        src='/imgs/loading.gif'
        alt='loading'
        width={width}
        height={height}
        unoptimized
      ></Image>
    </div>
  );
};

export default Loading;
