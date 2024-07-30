import React from 'react';
import styles from './skills.module.css';
import { josefinSans } from '@/app/styles/font';

const Skills = () => {
  return (
    <section id='skills' className={`${styles.skills} portfolioSection`}>
      <div className={styles.title}>
        <h1 className={`${josefinSans.className}`}>Skills</h1>
      </div>
      <h2 className={`${josefinSans.className}`}>Skills & Attributes</h2>
      <h3 className={styles.skills_about}>Overall</h3>
      <ul>
        <li className={styles.skills_li}>기존 팀의 개발 설계, 방법, 규칙 등을 이해하고 맞춰 개발합니다.</li>
        <li className={styles.skills_li}>최신 기술 동향을 지속적으로 학습하며, 프로젝트에 적합한 기술을 선택합니다.</li>
        <li className={styles.skills_li}>회사 업무 중 개발만이 나의 업무라고 생각하지 않습니다.</li>
        <li className={styles.skills_li}>확장 가능한 아키텍처 설계 및 구현으로 유지보수성을 향상 시킵니다.</li>
        <li className={styles.skills_li}>기획, 프론트엔드, 백엔드, 설계, 인프라 전반에 관심이 있습니다.</li>
      </ul>
      <h3 className={styles.skills_about}>Web</h3>
      <ul>
        <li className={styles.skills_li}>반응형 웹 제작으로 다양한 디바이스를 고려하여 개발합니다.</li>
        <li className={styles.skills_li}>모바일 브라우저와 모델 등에 따른 트러블 슈팅 경험이 있습니다.</li>
      </ul>
      <h3 className={styles.skills_about}>JavaScript & TypeScript</h3>
      <ul>
        <li className={styles.skills_li}>Modern JavaScript로 코드의 가독성과 유지보수성 향상을 위해 노력합니다.</li>
        <li className={styles.skills_li}>모듈 시스템(CommonJS, ES Modules)을 이해하고 사용합니다.</li>
        <li className={styles.skills_li}>Strict 타입 환경에 익숙하며 코드의 안정성 유지를 위해 노력합니다.</li>
      </ul>
      <h3 className={styles.skills_about}>FrontEnd</h3>
      <ul>
        <li className={styles.skills_li}>React Hooks를 사용하고 공통 비즈니스 로직을 모듈화하여 사용합니다.</li>
        <li className={styles.skills_li}>PostCSS, Styled-Components 사용 경험이 있습니다.</li>
        <li className={styles.skills_li}>Redux, Zustand 등을 이용한 전역 상태 관리를 합니다.</li>
        <li className={styles.skills_li}>NextJS SSR 프레임워크 사용 경험이 있습니다.</li>
      </ul>
      <h3 className={styles.skills_about}>BackEnd</h3>
      <ul>
        <li className={styles.skills_li}>Node.js 런타임 환경을 사용합니다.</li>
        <li className={styles.skills_li}>Express, Koa 등 프레임워크 사용 경험이 있습니다.</li>
        <li className={styles.skills_li}>클린 아키텍처와 객체 지향 설계를 이해하고 적용합니다.</li>
        <li className={styles.skills_li}>통합 에러 처리 및 로그 관리를 할 수 있으며, 미들웨어 사용에 익숙합니다.</li>
        <li className={styles.skills_li}>MySQL, MongoDB 사용 경험이 있습니다.</li>
      </ul>
      <h3 className={styles.skills_about}>ETC</h3>
      <ul>
        <li className={styles.skills_li}>Git을 이용한 형상 관리, GitHub 및 Bitbucket 사용 경험이 있습니다.</li>
        <li className={styles.skills_li}>Docker 및 Docker-Compose를 통한 환경 구성이 가능합니다.</li>
        <li className={styles.skills_li}>GitHub Actions를 이용한 CI/CD 구축 경험이 있습니다.</li>
        <li className={styles.skills_li}>ESLint(strict), Prettier, Webpack, Babel 등을 설정하고 사용합니다.</li>
        <li className={styles.skills_li}>DI Container를 이용하여 의존성을 관리합니다.</li>
        <li className={styles.skills_li}>Jest와 Cypress를 사용하여 테스트합니다.</li>
        <li className={styles.skills_li}>
          NPM, Yarn 등 패키지 매니저를 사용하며, node_modules 또는 PnP(Zero Install)을 사용합니다.
        </li>
        <li className={styles.skills_li}>
          Scrum과 Kanban을 통한 애자일 개발 프로세스로 프로젝트 관리 경험이 있으며, Jira를 사용할 수 있습니다.
        </li>
      </ul>
    </section>
  );
};

export default Skills;
