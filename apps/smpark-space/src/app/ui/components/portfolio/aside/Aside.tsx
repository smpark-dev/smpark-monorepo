import React from 'react';
import styles from './aside.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import menus from 'apps/smpark-space/src/app/utils/constants/portfolio/menus';
import Menu from './Menu';

const Aside = () => {
  return (
    <>
      <button className={styles.menu__btn}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={`${styles.menu}`}>
        {menus.map((item) => (
          <Menu key={item.id} />
        ))}
      </ul>
    </>
  );
};

export default Aside;
