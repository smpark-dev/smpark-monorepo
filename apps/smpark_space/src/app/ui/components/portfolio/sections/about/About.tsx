import React from 'react';
import styles from './about.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faServer } from '@fortawesome/free-solid-svg-icons';
import { faJsSquare } from '@fortawesome/free-brands-svg-icons';
import { josefinSans, nanumGothicCoding } from '@/app/styles/font';

const About = () => (
  <section id='about' className={`${styles.about} portfolioSection`}>
    <div className={styles.title}>
      <h1 className={josefinSans.className}>About me</h1>
    </div>
    <pre className={nanumGothicCoding.className}>
      {`3년 차 개발자로 스타트업에서 웹 서비스를 기획, 개발, 배포, 운영하였습니다. 
      작은 규모의 팀에 입사하여 팀의 유일한 개발자로서 사내에서 가장 높은 수익을 창출하는 팀으로 성장시키기까지 개발 업무를 책임졌습니다.
      
      클라이언트와 운영팀의 반복적인 작업을 자동화하기 위해 백오피스(BO)와 프론트오피스(FO)를 새로 설계하고 개발하여 기존 프로세스를 개선하였으며, 
      이로 인해 현재까지 클라이언트와 회사로부터 호평을 받으며 운영되고 있고, 수익을 창출하고 있습니다.
      
      저는 조용히 업무에 집중하는 편이며, 업무 파악 및 협조, 다른 동료의 의견 수렴에 적극적입니다. 
      스스로의 부족함을 인정하고 이를 개선하는 것을 두려워하지 않습니다.`}
    </pre>

    <div className={styles.majors}>
      <div className={styles.major}>
        <div className={styles.major__icon}>
          <FontAwesomeIcon icon={faJsSquare} />
        </div>
        <h2 className={styles.major__title}>Front-end</h2>
      </div>
      <div className={styles.major}>
        <div className={styles.major__icon}>
          <FontAwesomeIcon icon={faServer} />
        </div>
        <h2 className={styles.major__title}>Back-end</h2>
      </div>
    </div>
  </section>
);

export default About;
