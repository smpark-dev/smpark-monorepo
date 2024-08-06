'use client';
import React, { useEffect, useState, useCallback } from 'react';
import styles from './menu.module.css';
import list from 'apps/smpark-space/src/app/utils/constants/portfolio/list';
import List from './List';
import HighlightMenuList from 'apps/smpark-space/src/app/utils/services/menu_highlight/highlight_menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { usePortfolioStore } from 'apps/smpark-space/src/app/stores/portfoiloStore';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { didactGothic } from 'apps/smpark-space/src/app/styles/font';
import Loading from 'apps/smpark-space/src/app/ui/components/common/loading/Loading';

const Menu = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const articleRef = usePortfolioStore((state) => state.articleRef);
  const { data: _, status } = useSession();
  const router = useRouter();

  const onObserveTarget = useCallback((id: string) => {
    setActiveSection(id);
  }, []);

  useEffect(() => {
    if (articleRef?.current) {
      const sections = Array.from(articleRef.current.children) as HTMLDivElement[];
      const highlightMenuList = new HighlightMenuList();
      highlightMenuList.on(sections, onObserveTarget);
    }
  }, [articleRef, onObserveTarget]);

  return (
    <>
      <button className={styles.menu__btn}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={styles.menu}>
        {list.map((item) => (
          <List key={item.id} id={item.id} title={item.title} activeSection={activeSection} />
        ))}
        {status === 'loading' && <Loading width={50} height={50} containerHeight={24} />}
        {status === 'authenticated' && (
          <li className={`${styles.auth} ${didactGothic.className}`} onClick={() => signOut()}>
            Logout
          </li>
        )}
        {status === 'unauthenticated' && (
          <li
            className={`${styles.auth} ${didactGothic.className}`}
            onClick={() => router.push('/login')}
          >
            Login
          </li>
        )}
      </ul>
    </>
  );
};

export default Menu;
