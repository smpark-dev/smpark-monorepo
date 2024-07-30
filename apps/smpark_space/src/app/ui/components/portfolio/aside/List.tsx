import React from 'react';
import styles from './list.module.css';
import { ListProps } from '@/types/ui/portfolio/menu';
import MoveMenuSection from '@/app/utils/services/menu_highlight/move_menu';
import { usePortfolioStore } from '@/app/stores/portfoiloStore';
import { didactGothic } from '@/app/styles/font';

const List = ({ id, title, activeSection }: ListProps) => {
  const containerRef = usePortfolioStore((state) => state.containerRef);
  const articleRef = usePortfolioStore((state) => state.articleRef);

  const handleMoveSection = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (containerRef?.current && articleRef?.current) {
      const moveMenu = new MoveMenuSection();
      const sections = Array.from(articleRef.current.children) as HTMLDivElement[];

      const target = e.target as HTMLElement;
      if (target.dataset.id) {
        moveMenu.start(target.dataset.id, sections, containerRef.current);
      }
    }
  };

  return (
    <li
      className={`${styles.list} ${activeSection === id ? styles.active : ''} ${didactGothic.className}`}
      data-id={id}
      onClick={handleMoveSection}
    >
      {title}
    </li>
  );
};

export default List;
