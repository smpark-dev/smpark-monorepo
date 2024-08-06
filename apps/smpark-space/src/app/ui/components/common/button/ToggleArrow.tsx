'use client';
import React, { useState } from 'react';
import styles from './toggleArrow.module.css';
import { ToggleArrowProps } from 'apps/smpark-space/src/types/ui/common/button';

const ToggleArrow = ({ title = '', toggleDefault = false, children }: ToggleArrowProps) => {
  const [isOpen, setIsOpen] = useState(toggleDefault);
  const changeToggle = () => setIsOpen(!isOpen);

  return (
    <div className={`${styles.toggle_arrow_container} ${isOpen ? styles.open : ''}`}>
      <div className={styles.toggle_container}>
        <div className={styles.toogle_title_container} onClick={changeToggle}>
          <h3 className={styles.title}>{title}</h3>
          <div className={`${styles.arrow} ${isOpen ? styles.open : ''}`}></div>
        </div>
        {isOpen && <div className={styles.content}>{children}</div>}
      </div>
    </div>
  );
};

export default ToggleArrow;
