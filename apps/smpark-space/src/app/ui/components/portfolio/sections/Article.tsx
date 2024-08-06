'use client';
import React, { useEffect, useRef } from 'react';
import Home from './home/Home';
import About from './about/About';
import Skills from './skills/Skills';
import Work from './work/Work';
import Contact from './contact/Contact';
import styles from './article.module.css';
import { usePortfolioStore } from 'apps/smpark-space/src/app/stores/portfoiloStore';

const Article = () => {
  const articleRef = useRef<HTMLDivElement>(null);
  const setArticleRef = usePortfolioStore((state) => state.setArticleRef);

  useEffect(() => {
    if (articleRef.current) {
      setArticleRef(articleRef);
    }
  }, [articleRef, setArticleRef]);

  return (
    <article className={styles.article} ref={articleRef}>
      <Home />
      <About />
      <Skills />
      <Work />
      <Contact />
    </article>
  );
};

export default Article;
