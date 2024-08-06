import React from 'react';
import Image from 'next/image';
import styles from './propject.module.css';
import { ProjectProps } from 'apps/smpark-space/src/types/ui/portfolio/project';

const Project = ({ project }: ProjectProps) => {
  const { url, imgUrl, alt, title, type } = project;

  return (
    <a href={url} className={`${styles.project} ${type}`} target='_blank' rel='noopener noreferrer'>
      <Image src={`/${imgUrl}`} alt={alt} className={styles.projectImg} width={180} height={180} />
      <div className={styles.projectDescription}>
        <h3>{title}</h3>
      </div>
    </a>
  );
};

export default Project;
