'use client';
import React from 'react';
import styles from './info.module.css';
import { InfoProps } from '@/types/ui/portfolio/Info';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { copyTextToClipboard } from '@/app/utils/helpers/copyTextClipboard';

const Info = ({ info }: InfoProps) => {
  const handleTextClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.preventDefault();
    const text = e.currentTarget.textContent;
    if (text) {
      copyTextToClipboard(text);
    }
  };

  return (
    <div className={styles.content}>
      <h2>{info.title}</h2>
      <a href={info.url} target='_blank' rel='noopener noreferrer'>
        <FontAwesomeIcon icon={info.icon} />
      </a>
      <p className={styles.contentText} onClick={handleTextClick}>
        {info.content}
      </p>
    </div>
  );
};

export default Info;
