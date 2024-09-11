import Calendar from '@public/imgs/icons/calendar.svg';
import Code from '@public/imgs/icons/code.svg';
import Link from '@public/imgs/icons/link.svg';
import UserCog from '@public/imgs/icons/user-cog.svg';
import User from '@public/imgs/icons/user.svg';
import Users from '@public/imgs/icons/users.svg';

const TypeStyleOption = {
  PROJECT: { TYPE: 'bg-yellow-500 text-gray-900', TEXT: 'text-yellow-600', BADGE: 'bg-stone-700' },
  WORK: { TYPE: 'bg-[#2570eb] text-white', TEXT: 'text-blue-400', BADGE: 'bg-gray-700' },
};

export const WORK = {
  TITLE: 'My work',
  SUBTITLE: 'Core Work Experience & Projects',
  EXPERIENCE: [
    {
      EMOJI: '📱',
      TITLE: 'DualTalk 3.0',
      DESCRIPTION:
        '사용자가 직접 챗봇을 설계/디자인/관리/배포 할 수 있는 React SPA 올인원 반응형 플랫폼(BO & FO) 개발완료',
      TYPE: { TEXT: '업무 경험', STYLE: TypeStyleOption.WORK },
      IMAGE: { URI: '/imgs/dualtalk.webp', ALT: 'dualtalk 설명' },
      PERIOD: {
        ICON: Calendar,
        TEXT: '기간',
        DATE: '2022.03 - 2023.02',
      },
      ROLE: {
        ICON: User,
        TEXT: '역할',
        ROLE: 'Frontend Developer',
      },
      TEAM: {
        ICON: Users,
        TEXT: '팀 구성',
        ROLE: [
          'Frontend: (1+1)명',
          'Backend: (2+2)명',
          'AI 연구원: 1명',
          '디자이너: 1명',
          '기획자(PL): 1명',
          'DevOps: 1명',
          'QA: 2명',
        ],
      },
      KEY_POINT: {
        ICON: UserCog,
        TEXT: '주요 기술 포인트',
        WORKS: [
          '초기 기획 참여 및 SPA 아키텍처 설계, Page Base의 UI, State, Service(Logic) 등 모듈 분리',
          'Zustand, ReactQuery 도입을 통한 상태관리 분리',
          'Webpack5 도입을 통한 빌드 시간 단축 및 코드 스플리팅, 이미지, 리액트 랜더링 등 최적화',
          '사내 최고 매출 서비스 유지, 유지보수 비용 & 관리 인원 50% 이상 감축',
        ],
      },
      TECH_STACK: {
        ICON: Code,
        TEXT: '기술 스택',
        STACK: [
          'React',
          'TypeScript',
          'Zustand',
          'ReactQuery',
          'PostCSS',
          'Webpack5',
          'Babel',
          'Docker',
          'Jira',
          'BitBucket',
          'ESLint',
          'Prettier',
          'Jest',
        ],
      },
      LINKS: {
        ICON: Link,
        TEXT: '링크',
        LIST: [
          { TEXT: '공식 웹사이트', URL: 'https://www.dualtalk.ai/' },
          { TEXT: '출시 기사', URL: 'https://www.imaeil.com/page/view/2023110914325051970/' },
        ],
      },
    },
    {
      EMOJI: '📈',
      TITLE: '산업연구원(kiet)',
      DESCRIPTION: 'AI 분석을 통한 뉴스 동향 정보 데이터 시각화 SPA 프로젝트',
      TYPE: { TEXT: '업무 경험', STYLE: TypeStyleOption.WORK },
      IMAGE: { URI: '/imgs/kiet.webp', ALT: 'dualtalk 설명' },
      ROLE: {
        ICON: User,
        TEXT: '역할',
        ROLE: 'Frontend Developer',
      },
      TEAM: {
        ICON: User,
        TEXT: '팀 구성',
        ROLE: ['Frontend: 1명', 'Backend: 1명', 'AI 연구원: 1명', '기획자(PM)'],
      },
      PERIOD: {
        ICON: Calendar,
        TEXT: '기간',
        DATE: '2021.08 - 2023.02',
      },
      KEY_POINT: {
        ICON: UserCog,
        TEXT: '주요 업무 스타일',
        WORKS: [
          '1차 사업 이후 프론트엔드 인계, 기존 개발 컨벤션 유지하며 2차, 3차 프로젝트 완성',
          '업무미팅 적극 참여, 요구 기능사항 리스트업 후 공유',
          '업무미팅 시작 전 업데이트 된 리스트업 및 현황 팀원 공유',
          '미팅 시 클라이언트에게 중간 시연 및 새로운 피드백 리스트업 작성, 공유 반복',
          '프로젝트 문서 작성 후 제공 및 이례적 3차, 4차까지 계약 연장',
        ],
      },
      TECH_STACK: {
        ICON: Code,
        TEXT: '기술 스택',
        STACK: ['React', 'Redux', 'TypeScript', 'D3js', 'Docker', 'ESLint', 'Prettier'],
      },
    },
    {
      EMOJI: '🔐',
      TITLE: 'OAuth2.0',
      DESCRIPTION:
        'Access & Refresh Token을 발급 하는 OAuth2.0 인증 제공 SSR 프로젝트로 Clean Architecture를 도입하여 리팩토링',
      TYPE: { TEXT: '프로젝트', STYLE: TypeStyleOption.PROJECT },
      IMAGE: { URI: '/imgs/oauth2.0.webp', ALT: 'oauth2.0 설명' },
      PERIOD: {
        ICON: Calendar,
        TEXT: '기간 (리펙토링)',
        DATE: '2024.03 - 2024.05',
      },
      ROLE: {
        ICON: User,
        TEXT: '역할',
        ROLE: 'Full Stack Developer',
      },
      TEAM: {
        ICON: Users,
        TEXT: '팀 구성',
        ROLE: ['Full Stack: 1명'],
      },
      KEY_POINT: {
        ICON: UserCog,
        TEXT: '주요 기술 포인트',
        WORKS: [
          'XSS, CSRF, DoS, CORS, CSP, OAuth2.0 등 다양한 보안 기술 적용',
          '자체 개발 OAuth2.0 서버의 토큰을 활용한 서비스 접근 권한 제어 및 smpark 소셜 로그인 기능 구현',
          'Clean Architecture 적용으로 내부 비즈니스 로직 보호, 의존성 주입(DI) 활용을 통한 모듈 간 결합도 감소, 코드 유지보수성 및 테스트 용이성 개선',
        ],
      },
      TECH_STACK: {
        ICON: Code,
        TEXT: '기술 스택',
        STACK: [
          'NodeJS',
          'Express',
          'TypeScript',
          'JavaScript',
          'NX Monorepo',
          'Pug',
          'MongoDB',
          'Esbuild',
          'Docker',
          'GitHubActions',
          'ESLint',
          'Prettier',
          'Jest',
          'Cypress',
        ],
      },
      LINKS: {
        ICON: Link,
        TEXT: '링크',
        LIST: [{ TEXT: '웹사이트', URL: 'https://www.dualtalk.ai/' }],
      },
    },
    {
      EMOJI: '🚀',
      TITLE: 'smpark.dev',
      DESCRIPTION:
        '개인 포트폴리오 NextJS 프로젝트로 Feature Slice Design 방법론를 도입하여 리팩토링',
      TYPE: { TEXT: '프로젝트', STYLE: TypeStyleOption.PROJECT },
      IMAGE: { URI: '/imgs/smpark-dev.webp', ALT: 'smpark-dev 설명' },
      PERIOD: {
        ICON: Calendar,
        TEXT: '기간 (리펙토링)',
        DATE: '2024.06 - 2024.08',
      },
      ROLE: {
        ICON: User,
        TEXT: '역할',
        ROLE: 'Full Stack Developer',
      },
      TEAM: {
        ICON: Users,
        TEXT: '팀 구성',
        ROLE: ['Full Stack: 1명'],
      },
      KEY_POINT: {
        ICON: UserCog,
        TEXT: '주요 기술 포인트',
        WORKS: [
          'Feature Sliced Design 방식과 re-export 패턴을 적용하여 모듈별 캡슐화를 통한 결합도 감소 및 기능별 확장성 향상을 위한 리팩토링 수행',
          'OAuth2.0 프로젝트와 연계하여 smpark 소셜 로그인 기능 적용',
          'Image blur, Font swap 등을 이용한 이미지와 폰트 최적화, 스크롤 이벤트 대신 Intersection Observer를 이용한 스크롤 이벤트 최적화, requestAnimationFrame을 이용한 canvas 렌더링 최적화 등 적용',
          'Lighthouse를 활용한 웹 성능 분석을 통해 성능, 접근성, 모범 사례 및 검색엔진 최적화(SEO) 영역에서 고득점 달성'
        ],
      },
      TECH_STACK: {
        ICON: Code,
        TEXT: '기술 스택',
        STACK: [
          'Next.js',
          'TypeScript',
          'Zustand',
          'NextAuth',
          'NX Monorepo',
          'Tailwind',
          'Docker',
          'GitHubActions',
          'ESLint',
          'Prettier',
        ],
      },
      LINKS: {
        ICON: Link,
        TEXT: '링크',
        LIST: [{ TEXT: '웹사이트', URL: 'https://www.smpark.dev' }],
      },
    },
  ],
};
