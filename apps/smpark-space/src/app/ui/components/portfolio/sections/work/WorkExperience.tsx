import React from 'react';
import styles from './workExperience.module.css';
import { workExperienceProps } from 'apps/smpark-space/src/types/ui/portfolio/workExperience';

const WorkExperience = ({ item }: workExperienceProps) => (
  <ul className={styles.list}>
    <div className={styles.company_container}>
      <h3 className={styles.company}>{item.company}</h3>
      <p className={styles.period}>{item.period}</p>
    </div>
    <div className={styles.info_container}>
      {item.works &&
        item.works.map((work) => (
          <li className={styles.info_list_container} key={work.id}>
            <div className={styles.title_list_container}>
              <h3>{work.title}</h3>
              <p className={styles.period}>{work.period}</p>
            </div>
            <div className={styles.descript_title_container}>
              <h4 className={styles.descript_title}>Descript</h4>
              <p className={styles.descript}>{work.descript}</p>
              <h4 className={styles.experience_title}>Work Experience</h4>
              <ul className={styles.experience}>
                {work.experience &&
                  work.experience.map((exp) => (
                    <li key={exp.id}>
                      <p>{exp.detail}</p>
                    </li>
                  ))}
              </ul>
              <h4 className={styles.tech_stack_title}>Tech Stack</h4>
              <p className={styles.tech_stack}>{work.stack}</p>
              {work?.link && (
                <ul className={styles.link}>
                  <h4 className={styles.link_title}>Link</h4>
                  {work.link.map((link) => (
                    <li key={link.id}>
                      <a href={link.link} target='_blank' rel='noopener noreferrer'>
                        {link.description}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
    </div>
  </ul>
);

export default WorkExperience;
