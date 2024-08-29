import AtSign from '@public/imgs/icons/at-sign.svg';
import Book from '@public/imgs/icons/book.svg';
import Code from '@public/imgs/icons/code.svg';
import Cpu from '@public/imgs/icons/cpu.svg';
import Github from '@public/imgs/icons/github.svg';
import Server from '@public/imgs/icons/server.svg';
import Shield from '@public/imgs/icons/shield.svg';
import Star from '@public/imgs/icons/star.svg';

import Alert from '@public/imgs/icons/circle-alert.svg';
import FireBase from '@public/imgs/icons/firebase.svg';
import BitBucket from '@public/imgs/icons/bitbucket.svg';
import Clean from '@public/imgs/icons/clean.svg';
import Circle from '@public/imgs/icons/circle.svg';
import CSS3 from '@public/imgs/icons/css3.svg';
import Cypress from '@public/imgs/icons/cypress.svg';
import Docker from '@public/imgs/icons/docker.svg';
import Eslint from '@public/imgs/icons/eslint.svg';
import Express from '@public/imgs/icons/express.svg';
import FSD from '@public/imgs/icons/fsd.svg';
import Git from '@public/imgs/icons/git.svg';
import GitHubActions from '@public/imgs/icons/githubactions.svg';
import HTML5 from '@public/imgs/icons/html5.svg';
import Java from '@public/imgs/icons/java.svg';
import JavaScript from '@public/imgs/icons/javascript.svg';
import Jest from '@public/imgs/icons/jest.svg';
import Jira from '@public/imgs/icons/jira.svg';
import JQuery from '@public/imgs/icons/jquery.svg';
import Koa from '@public/imgs/icons/koa.svg';
import MongoDB from '@public/imgs/icons/mongodb.svg';
import MySQL from '@public/imgs/icons/mysql.svg';
import NextJS from '@public/imgs/icons/nextdotjs.svg';
import NodeJS from '@public/imgs/icons/nodedotjs.svg';
import Npm from '@public/imgs/icons/npm.svg';
import Nx from '@public/imgs/icons/nx.svg';
import PostCSS from '@public/imgs/icons/postcss.svg';
import Prettier from '@public/imgs/icons/prettier.svg';
import Pug from '@public/imgs/icons/pug.svg';
import React from '@public/imgs/icons/react.svg';
import ReactQuery from '@public/imgs/icons/reactquery.svg';
import Redux from '@public/imgs/icons/redux.svg';
import StyledComponents from '@public/imgs/icons/styledcomponents.svg';
import TailwindCSS from '@public/imgs/icons/tailwindcss.svg';
import TypeScript from '@public/imgs/icons/typescript.svg';
import Webpack from '@public/imgs/icons/webpack.svg';
import Yarn from '@public/imgs/icons/yarn.svg';
import Zustand from '@public/imgs/icons/zustand.svg';

export const NAVIGATION = [
  { id: 'home', title: 'Home' },
  { id: 'about', title: 'About' },
  { id: 'skills', title: 'Skills' },
  { id: 'work', title: 'Work' },
  { id: 'contact', title: 'Contact' },
];

export const HOME = {
  ID: 'home',
  TITLE: "smpark's portfolio",
  WELCOME_MESSAGE: ['우리는 홀로 빛나면서도', '모두가 연결된 하나의 존재이다.'],
  IMAGE_ALT: (index: number) => `주인장 ${index + 1}번째 그림카드`,
  IMAGES_URL: [
    '/imgs/smpark1.webp',
    '/imgs/smpark3.webp',
    '/imgs/smpark4.webp',
    '/imgs/smpark5.webp',
    '/imgs/smpark6.webp',
    '/imgs/smpark7.webp',
    '/imgs/smpark8.webp',
    '/imgs/smpark9.webp',
  ],
  ANIMATION: {
    ROTATE_DELAY: 700,
    STATES: {
      INIT: 'INIT',
      ROTATING: 'ROTATING',
      PAUSED: 'PAUSED',
    } as const,
    CLASSES: {
      INIT: '',
      ROTATING: 'animate-rotate-y-90',
      PAUSED: 'animate-rotate-y-0',
    } as const,
  },
};

export const ABOUT = {
  TITLE: 'About me',
  DESCRIPTION: [
    {
      ICON: Star,

      TITLE: '메인 업무 경험',
      CONTENT:
        '스타트업 메인 수익 서비스(BO & FO)의 설계, 개발, 배포, 운영 경험이 있습니다. 이를 통해 서비스의 전체 생명주기를 이해하고 관리할 수 있습니다.',
    },
    {
      ICON: Code,
      TITLE: '웹 최적화',
      CONTENT:
        'FCP, LCP, CLS, TTI, TBT, SEO 등 사용자 경험을 중심으로 핵심 성능 지표를 개선하고 검색 엔진을 최적화 합니다.',
    },
    {
      ICON: Shield,
      TITLE: '웹 보안',
      CONTENT:
        'XSS, CSRF, DoS, CORS, CSP, OAuth2.0 등 주요 보안 위협을 고려하여 안전한 웹 애플리케이션 개발에 주력합니다.',
    },
    {
      ICON: Server,
      TITLE: '백엔드 이해',
      CONTENT:
        'NodeJS, Express, Koa를 활용한 개발 경험을 바탕으로 백엔드 환경을 이해하고, 백엔드 개발자와 원활한 협업이 가능합니다.',
    },
    {
      ICON: Cpu,
      TITLE: '아키텍처 및 설계',
      CONTENT:
        'Clean Architecture, MVC, Flux 등의 아키텍처 패턴과 FSD(Feature Sliced Design)와 같은 프로젝트 구조화 적용 경험을 바탕으로 확장 가능하고 유지보수가 용이한 코드베이스를 구축합니다.',
    },
    {
      ICON: Book,
      TITLE: '성격 및 업무 스타일',
      CONTENT: {
        성격: '내성적, 현실적, 관계지향적 or 목표지향적, 계획적',
        노력: '복잡한 기술 개념을 직군 누구나 쉽게 이해할 수 있도록 설명하기 위해 노력합니다.',
        협업: '솔직함과 배려심을 바탕으로 원팀이 되기 위해 노력하고 기술 공유에 적극적입니다.',
        문제해결:
          '다양한 접근 방식을 시도하며, 팀과 현재 상황을 공유하여 효과적이고 투명한 문제 해결 과정을 추구합니다.',
      },
    },
  ],
  SUBTITLE: { FRONT: 'Front-end', BACK: 'Back-end' },
};

export const SKILLS = {
  TITLE: 'Skills',
  SUBTITLE: 'Skills & Attributes',
  LEGEND: [
    {
      ICON: Circle,
      COLOR: '#0d5b91',
      TEXT: '선호 기술',
    },
    {
      ICON: Circle,
      COLOR: '#2e3642',
      TEXT: '사용 기술',
    },
  ],
  SECTIONS: [
    {
      CATEGORY: 'Languages',
      SKILLS: [
        { NAME: 'TypeScript', ICON: TypeScript, COLOR: '#3178C6', PROFICIENCY: true },
        { NAME: 'JavaScript', ICON: JavaScript, COLOR: '#F7DF1E', PROFICIENCY: true },
        { NAME: 'Java', ICON: Java, COLOR: '#007396', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Databases',
      SKILLS: [
        { NAME: 'MongoDB', ICON: MongoDB, COLOR: '#47A248', PROFICIENCY: true },
        { NAME: 'FireBase', ICON: FireBase, COLOR: '#DD2C00', PROFICIENCY: false },
        { NAME: 'MySQL', ICON: MySQL, COLOR: '#4479A1', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Backend',
      SKILLS: [
        { NAME: 'Node.js', ICON: NodeJS, COLOR: '#5FA04E', PROFICIENCY: true },
        { NAME: 'Express', ICON: Express, COLOR: '#ffffff', PROFICIENCY: true },
        { NAME: 'Koa', ICON: Koa, COLOR: 'white', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Frontend',
      SKILLS: [
        { NAME: 'React', ICON: React, COLOR: '#61DAFB', PROFICIENCY: true },
        { NAME: 'Next.js', ICON: NextJS, COLOR: '#ffffff', PROFICIENCY: true },
        { NAME: 'Zustand', ICON: Zustand, COLOR: '#764ABC', PROFICIENCY: true },
        { NAME: 'React Query', ICON: ReactQuery, COLOR: '#FF4154', PROFICIENCY: true },
        { NAME: 'Redux', ICON: Redux, COLOR: '#764ABC', PROFICIENCY: false },
        { NAME: 'JQuery', ICON: JQuery, COLOR: '#0769AD', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Styling',
      SKILLS: [
        { NAME: 'Tailwind CSS', ICON: TailwindCSS, COLOR: '#06B6D4', PROFICIENCY: true },
        { NAME: 'PostCSS', ICON: PostCSS, COLOR: '#DD3A0A', PROFICIENCY: true },
        {
          NAME: 'Styled Components',
          ICON: StyledComponents,
          COLOR: '#DB7093',
          PROFICIENCY: false,
        },
        { NAME: 'CSS3', ICON: CSS3, COLOR: '#1572B6', PROFICIENCY: false },
        { NAME: 'HTML5', ICON: HTML5, COLOR: '#E34F26', PROFICIENCY: false },
        { NAME: 'Pug', ICON: Pug, COLOR: '#A86454', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Tools',
      SKILLS: [
        { NAME: 'Nx Monorepo', ICON: Nx, COLOR: 'white', PROFICIENCY: false },
        { NAME: 'Yarn berry', ICON: Yarn, COLOR: '#2C8EBB', PROFICIENCY: false },
        { NAME: 'NPM', ICON: Npm, COLOR: '#CB3837', PROFICIENCY: false },
        { NAME: 'Git', ICON: Git, COLOR: '#F05032', PROFICIENCY: false },
        { NAME: 'Docker', ICON: Docker, COLOR: '#2496ED', PROFICIENCY: false },
        {
          NAME: 'GitHub Actions',
          ICON: GitHubActions,
          COLOR: '#2088FF',
          PROFICIENCY: false,
        },
        { NAME: 'Webpack', ICON: Webpack, COLOR: '#8DD6F9', PROFICIENCY: false },
        { NAME: 'Jira', ICON: Jira, COLOR: '#0052CC', PROFICIENCY: false },
        { NAME: 'Bitbucket', ICON: BitBucket, COLOR: '#0052CC', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Code Quality & Testing',
      SKILLS: [
        { NAME: 'ESLint', ICON: Eslint, COLOR: '#4B32C3', PROFICIENCY: false },
        { NAME: 'Prettier', ICON: Prettier, COLOR: '#F7B93E', PROFICIENCY: false },
        { NAME: 'Jest', ICON: Jest, COLOR: '#C21325', PROFICIENCY: false },
        { NAME: 'Cypress', ICON: Cypress, COLOR: '#69D3A7', PROFICIENCY: false },
      ],
    },
    {
      CATEGORY: 'Architecture & Methodology',
      SKILLS: [
        {
          NAME: 'Clean Architecture',
          ICON: Clean,
          COLOR: 'red',
          PROFICIENCY: false,
        },
        {
          NAME: 'Feature Slice Design',
          ICON: FSD,
          PROFICIENCY: false,
        },
      ],
    },
  ],
};

export const WORK = {
  TITLE: 'My work',
  DESCRIPTION: '경력 프로젝트 일부와 개인 프로젝트를 기술하였습니다.',
  EXPERIENCE: [
    {
      TITLE: 'OAuth2.0 인증서버 구축',
      TYPE: 'project',
      ROLE: {
        TEXT: '내 역할',
        ROLE: 'Full Stack Developer',
      },
      // TEAM: {
      //   TEXT: '팀 구성',
      //   ROLE: ['Frontend: 4명', 'Backend: 4명', '디자이너: 1명', '기획자: 1명', 'DevOps: 1명'],
      // },
      PERIOD: {
        ICON: '',
        DATE: 2024.06 - 2023.07,
      },
      KEY_POINT: {
        TEXT: '주요 기술적 기여',
        WORKS: [
          'D3.js를 활용한 복잡한 데이터 시각화 구현',
          'Redux를 이용한 대규모 데이터 상태 관리',
          '반응형 디자인으로 다양한 디바이스 지원',
          '팀 리더로서 작업 분배 및 일정 관리 담당',
        ],
      },
      TECH_STACK: {
        ICON: '',
        STACK: [
          'Node.js, Express, MongoDB, OAuth2.0, TypeScript, JavaScript, Docker, GitHubActions, ESLint, Prettier, Jest, Cypress',
        ],
      },
      LINKS: [{ ICON: '', TEXT: 'GitHub', URL: '#' }],
    },
  ],
};

// export const WORK = {
//   title: 'My work',
//   description: '경력 프로젝트 일부와 개인 프로젝트를 기술하였습니다.',
//   portfolio_title: '클린 아키텍처 & DDD',
//   portfolio_list: [
//     {
//       id: 1,
//       title: 'Summary Card',
//       url: 'https://github.com/starry-winter-night/portfolio-site-react#Summary__Card',
//       type: 'frontend',
//       imgUrl: 'imgs/study_card.png',
//       alt: 'study_card',
//     },
//   ],
//   work_list: [
//     {
//       id: 1,
//       company: 'Xinapse',
//       period: '2021.08 ~ 2023.02',
//       works: [
//         {
//           id: 1,
//           title: '듀얼톡 3.0 React Version 개발완료',
//           period: '2022.03 ~ 2023.02',
//           description: `클라이언트가 직접 챗봇을 디자인하고 기능을 간편하게 선택 할 수 있도록 백 오피스를
//         제작하였습니다. 기존 버전 서비스의 기능을 포함하여 새로운 기능들을 구현을하였습니다.
//         `,
//           stack: 'React, Zustand, PostCSS, TypeScript, Webpack5',
//           link: [
//             { id: 1, link: 'https://www.dualtalk.ai/', description: '공식 웹사이트' },
//             {
//               id: 2,
//               link: 'https://www.imaeil.com/page/view/2023110914325051970',
//               description: '출시 기사',
//             },
//           ],
//           experience: [
//             {
//               id: 1,
//               detail: '프론트엔드 기술환경 구성 및 기능 구현',
//             },
//             {
//               id: 2,
//               detail: 'Fetch, Type, State, Logic, View 분리 모듈화 설계',
//             },
//             {
//               id: 3,
//               detail: 'QA 이후 버그 픽스 및 서비스 오픈',
//             },
//             {
//               id: 4,
//               detail:
//                 'Drag & Drop을 통한 (이미지, 영상, 텍스트에디터, 지도등) 커스텀 화면 제작 기능 구현등',
//             },
//           ],
//         },
//         {
//           id: 2,
//           title: '산업연구원(kiet) 2차, 3차 개발 및 납품 (프론트엔드)',
//           period: '2021.08 ~ 2023.02',
//           description: `1차 개발 된 서비스를 이어받아 완성 및 납품한 웹 페이지입니다.
//         주로 데이터를 시각화하는 작업을 하였습니다.`,
//           stack: 'React, Redux, PostCss',
//           experience: [
//             {
//               id: 1,
//               detail: '2차 : 뉴스 지표 및 관련 산업 지수의 시각화 (차트) ',
//             },
//             {
//               id: 2,
//               detail: '3차 : 뉴스 지표 및 관련 산업 지수의 시각화 (클라우드)',
//             },
//             {
//               id: 3,
//               detail: '4차 : 계약 완료 및 개발 예정',
//             },
//           ],
//         },
//         {
//           id: 3,
//           title: '듀얼톡 1.0 Vue Version  운영, 기능 개발, 유지 보수 (프론트엔드)',
//           period: '2021.08 ~ 2023.02',
//           description: `1세대 듀얼톡으로 최초 서비스를 이용한 고객사를 위해 운영되는 챗봇으로 레거시 버전을 업데이트 하고
//         고객의 요구에 맞춰 개발 및 운영, 유지보수 하였습니다. `,
//           stack: 'Vue, Vuex',
//           experience: [
//             {
//               id: 1,
//               detail: '프론트엔드 기능 구현 및 보수',
//             },
//             {
//               id: 2,
//               detail: '레거시 버전 업데이트 및 패키지 충돌 개선',
//             },
//             {
//               id: 3,
//               detail: '머신러닝 학습 페이지(각종 시각화, 학습 진행도 실시간 표기, 진행률) 등 추가',
//             },
//           ],
//         },
//         {
//           id: 4,
//           title: '듀얼톡 2.0 React Version 운영, 기능 개발, 유지 보수 (프론트엔드)',
//           period: '2021.08 ~ 2023.02',
//           description: `2세대 듀얼톡으로 1세대에 비해 편의 기능이 확장된 챗봇으로 미완성 서비스를 이어받아 완성 시켰습니다.
//         주로 고객의 요구에 맞춰 개발 및 운영, 유지보수 하였습니다. `,
//           stack: 'React, Redux, Styled-components, TypeScript',
//           experience: [
//             {
//               id: 1,
//               detail: '프론트엔드 미구현 기능 개발 및 유지보수',
//             },
//             {
//               id: 2,
//               detail: '클라이언트 요구에 따른 기능 개발',
//             },
//             {
//               id: 3,
//               detail:
//                 '자동완성 및 방향키를 이용한 선택 기능, 자주찾는 인텐트 리스트, 듀얼페이지 등 개발',
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: 2,
//       company: 'Assemble',
//       period: '2017.12 ~ 2019.01',
//       works: [
//         {
//           id: 1,
//           title: '철물점 재고관리시스템',
//           period: '2018.09 ~ 2018.12',
//           description: `ERP & POS를 웹페이지로 서비스 하기 위한 프로젝트입니다.
//         직접 클라이언트를 만나 진행사항 및 애로사항을 공유하며 작업하였습니다.`,
//           stack: 'NodeJS, Express, PUG, JAVASCRIPT, MYSQL',
//           experience: [
//             {
//               id: 1,
//               detail: 'DB 설계 제작 및 철물점 제품 DB 구축',
//             },
//             {
//               id: 2,
//               detail: '백엔드 & 프론트엔드 기술환경 구축 및 개발',
//             },
//             {
//               id: 3,
//               detail: '전자세금계산서 API 연동',
//             },
//             {
//               id: 4,
//               detail: 'POS 기능을 위한 스캐너 조작 테스트 등',
//             },
//           ],
//         },
//         {
//           id: 2,
//           title: '티몬 출시(판매) 상품 재고관리시스템',
//           period: '2018.07 ~ 2018.09',
//           description: '사내 배송 제품을 관리하는 웹페이지 제작 추가 인원으로 참여 하였습니다.',
//           stack: 'NodeJS, Express, HTML, JQuery, MYSQL',
//           experience: [
//             {
//               id: 1,
//               detail: '주문, 환불 페이지 UI/UX 디자인 적용 및 주문, 백앤드 코드 작성',
//             },
//           ],
//         },
//         {
//           id: 3,
//           title: '네이버 CLOVA 연동 AI 쇼핑 웹 서비스 프로토 타입 제작',
//           period: '2018.05 ~ 2018.07',
//           description: `네이버 클로버의 음성인식 데이터에 따라 웹화면을 시각화(쇼핑 페이지)하는 서비스의
//         프로토 타입을 개발하였습니다. `,
//           stack: 'NodeJS, Express, HTML, Javascript, Oauth2.0',
//           experience: [
//             {
//               id: 1,
//               detail: 'Oauth2.0 토큰을 통한 연동',
//             },
//             {
//               id: 2,
//               detail: '음성인식 패턴에 따른 분기 처리 및 데이터 시각화',
//             },
//           ],
//         },
//         {
//           id: 4,
//           title: '레일바이크 안드로이드 어플리케이션 유지보수',
//           period: '2018.04 ~ 2018.04',
//           description: '레일바이크 어플리케이션의 사용 권한 퍼미션 문제를 해결하였습니다.',
//           stack: 'Android(JAVA)',
//           experience: [
//             {
//               id: 1,
//               detail: `퍼미션 문제 해결 및 곡성 레일바이크 시승 테스트
//             `,
//             },
//           ],
//         },
//         {
//           id: 5,
//           title: '프로젝트 라이프사이클 관리 시스템',
//           period: '2018.01 ~ 2018.03',
//           description: `사내 중구난방 프로젝트를 정리하고 개발 현황을 체계적으로 확인하고 보고 할 수 있도록
//         제안하고 개발한 웹 서비스입니다. `,
//           stack: 'NodeJS, Express, Pug, Javascript, MySQL',
//           experience: [
//             {
//               id: 1,
//               detail: '백엔드 & 프론트엔드 기술환경 구축 및 개발',
//             },
//             {
//               id: 2,
//               detail:
//                 '프로젝트 상태를 5가지로 나누고, 상태에 따라 담당자에게 메일을 보내는 기능등을 제작',
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };

export const CONTACT = {
  TITLE: 'Contact',
  SUBTITLE: 'E-mail & Chatting',
  DESCRIPTION: [
    '하단의',
    '아이콘',
    '을 클릭하시면 각각 저의 이메일과 깃허브로 연결됩니다.',
    '감사합니다. :D',
  ],
};

export const CONTACT_INFOS = [
  {
    ID: 1,
    TITLE: 'E-mail Address',
    ICON: AtSign,
    URL: 'mailto:smpark7723@gmail.com',
    CONTENT: 'smpark7723@gmail.com',
  },
  {
    ID: 2,
    TITLE: 'GitHub Link',
    ICON: Github,
    URL: 'https://github.com/smpark-dev',
    CONTENT: 'github.com/smpark-dev',
  },
];
