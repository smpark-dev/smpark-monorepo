import React from 'react';
import styles from './work.module.css';
import Project from './Project';
import { portfolio2021, portfolio2024, work } from '@/app/utils/constants/portfolio/work';
import ToggleArrow from '@/app/ui/components/common/button/ToggleArrow';
import WorkExperience from './WorkExperience';
import { josefinSans, nanumGothicCoding } from '@/app/styles/font';

const Work = () => {
  return (
    <section id='work' className={`${styles.work} portfolioSection ${josefinSans.className}`}>
      <div className={styles.title}>
        <h1 className={`${josefinSans.className}`}>My work</h1>
      </div>
      <p className={nanumGothicCoding.className}>이미지를 클릭하시면 해당하는 GitHub Page로 이동합니다.</p>
      <ToggleArrow title={'Portfolio(2021)'}>
        <div className={styles.projects}>
          <h2>Back-end</h2>
          {portfolio2021.map((item) => item.type === 'backend' && <Project key={item.id} project={item} />)}
          <h2>Front-end</h2>
          {portfolio2021.map((item) => item.type === 'frontend' && <Project key={item.id} project={item} />)}
        </div>
      </ToggleArrow>

      <ToggleArrow title={'Portfolio(2024)'}>
        <div className={styles.projects}>
          <h2>클린 아키텍처 & DDD</h2>
          {portfolio2024.map((item) => (
            <Project key={item.id} project={item} />
          ))}
        </div>
      </ToggleArrow>

      <ToggleArrow title={'Work Experience'} toggleDefault={true}>
        <div className={styles.container}>
          {work.map((item) => (
            <WorkExperience key={item.id} item={item} />
          ))}
        </div>
      </ToggleArrow>
    </section>
  );
};

export default Work;
