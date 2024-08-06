export const portfolio2021 = [
  {
    id: 1,
    title: 'SMP Oauth2.0 Server',
    url: 'https://github.com/starry-winter-night/smp_oauth_server',
    type: 'backend',
    imgUrl: 'imgs/oauth2.0.png',
    alt: 'smp_oauth',
  },
  {
    id: 2,
    title: 'SMP Resource Server',
    url: 'https://github.com/starry-winter-night/smp-resource-server',
    type: 'backend',
    imgUrl: 'imgs/resource_server.png',
    alt: 'resource_server',
  },
  {
    id: 3,
    title: 'SMPCHAT third-party-service',
    url: 'https://github.com/starry-winter-night/smpchat-library',
    type: 'frontend',
    imgUrl: 'imgs/smpchat_logo_compress.png',
    alt: 'smpchat',
  },
  {
    id: 4,
    title: 'Portfolio Site',
    url: 'https://github.com/starry-winter-night/portfolio-site-react',
    type: 'frontend',
    imgUrl: 'imgs/smpark.jpg',
    alt: 'owner',
  },
  {
    id: 5,
    title: 'Youtube Channel',
    url: 'https://github.com/starry-winter-night/portfolio-site-react#Youtube__Channel',
    type: 'frontend',
    imgUrl: 'imgs/youtube_logo.png',
    alt: 'youtube',
  },
  {
    id: 6,
    title: 'Summary Card',
    url: 'https://github.com/starry-winter-night/portfolio-site-react#Summary__Card',
    type: 'frontend',
    imgUrl: 'imgs/study_card.png',
    alt: 'study_card',
  },
];

export const portfolio2024 = [
  {
    id: 1,
    title: 'Summary Card',
    url: 'https://github.com/starry-winter-night/portfolio-site-react#Summary__Card',
    type: 'frontend',
    imgUrl: 'imgs/study_card.png',
    alt: 'study_card',
  },
];

export const work = [
  {
    id: 1,
    company: 'Xinapse',
    period: '2021.08 ~ 2023.02',
    works: [
      {
        id: 1,
        title: '듀얼톡 3.0 React Version 개발완료',
        period: '2022.03 ~ 2023.02',
        descript: `클라이언트가 직접 챗봇을 디자인하고 기능을 간편하게 선택 할 수 있도록 백 오피스를 
        제작하였습니다. 기존 버전 서비스의 기능을 포함하여 새로운 기능들을 구현을하였습니다. 
        `,
        stack: 'React, Zustand, PostCSS, TypeScript, Webpack5',
        link: [
          { id: 1, link: 'https://www.dualtalk.ai/', description: '공식 웹사이트' },
          { id: 2, link: 'https://www.imaeil.com/page/view/2023110914325051970', description: '출시 기사' },
        ],
        experience: [
          {
            id: 1,
            detail: `프론트엔드 기술환경 구성 및 기능 구현`,
          },
          {
            id: 2,
            detail: `Fetch, Type, State, Logic, View 분리 모듈화 설계`,
          },
          {
            id: 3,
            detail: `QA 이후 버그 픽스 및 서비스 오픈`,
          },
          {
            id: 4,
            detail: `Drag & Drop을 통한 (이미지, 영상, 텍스트에디터, 지도등) 커스텀 화면 제작 기능 구현등`,
          },
        ],
      },
      {
        id: 2,
        title: '산업연구원(kiet) 2차, 3차 개발 및 납품 (프론트엔드)',
        period: '2021.08 ~ 2023.02',
        descript: `1차 개발 된 서비스를 이어받아 완성 및 납품한 웹 페이지입니다. 
        주로 데이터를 시각화하는 작업을 하였습니다.`,
        stack: 'React, Redux, PostCss',
        experience: [
          {
            id: 1,
            detail: `2차 : 뉴스 지표 및 관련 산업 지수의 시각화 (차트) `,
          },
          {
            id: 2,
            detail: `3차 : 뉴스 지표 및 관련 산업 지수의 시각화 (클라우드)`,
          },
          {
            id: 3,
            detail: `4차 : 계약 완료 및 개발 예정`,
          },
        ],
      },
      {
        id: 3,
        title: '듀얼톡 1.0 Vue Version  운영, 기능 개발, 유지 보수 (프론트엔드)',
        period: '2021.08 ~ 2023.02',
        descript: `1세대 듀얼톡으로 최초 서비스를 이용한 고객사를 위해 운영되는 챗봇으로 레거시 버전을 업데이트 하고 
        고객의 요구에 맞춰 개발 및 운영, 유지보수 하였습니다. `,
        stack: 'Vue, Vuex',
        experience: [
          {
            id: 1,
            detail: `프론트엔드 기능 구현 및 보수`,
          },
          {
            id: 2,
            detail: `레거시 버전 업데이트 및 패키지 충돌 개선`,
          },
          {
            id: 3,
            detail: `머신러닝 학습 페이지(각종 시각화, 학습 진행도 실시간 표기, 진행률) 등 추가`,
          },
        ],
      },
      {
        id: 4,
        title: '듀얼톡 2.0 React Version 운영, 기능 개발, 유지 보수 (프론트엔드)',
        period: '2021.08 ~ 2023.02',
        descript: `2세대 듀얼톡으로 1세대에 비해 편의 기능이 확장된 챗봇으로 미완성 서비스를 이어받아 완성 시켰습니다.
        주로 고객의 요구에 맞춰 개발 및 운영, 유지보수 하였습니다. `,
        stack: 'React, Redux, Styled-components, TypeScript',
        experience: [
          {
            id: 1,
            detail: `프론트엔드 미구현 기능 개발 및 유지보수`,
          },
          {
            id: 2,
            detail: `클라이언트 요구에 따른 기능 개발`,
          },
          {
            id: 3,
            detail: `자동완성 및 방향키를 이용한 선택 기능, 자주찾는 인텐트 리스트, 듀얼페이지 등 개발`,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    company: 'Assemble',
    period: '2017.12 ~ 2019.01',
    works: [
      {
        id: 1,
        title: '철물점 재고관리시스템',
        period: '2018.09 ~ 2018.12',
        descript: `ERP & POS를 웹페이지로 서비스 하기 위한 프로젝트입니다. 
        직접 클라이언트를 만나 진행사항 및 애로사항을 공유하며 작업하였습니다.`,
        stack: 'NodeJS, Express, PUG, JAVASCRIPT, MYSQL',
        experience: [
          {
            id: 1,
            detail: `DB 설계 제작 및 철물점 제품 DB 구축`,
          },
          {
            id: 2,
            detail: `백엔드 & 프론트엔드 기술환경 구축 및 개발`,
          },
          {
            id: 3,
            detail: `전자세금계산서 API 연동`,
          },
          {
            id: 4,
            detail: `POS 기능을 위한 스캐너 조작 테스트 등`,
          },
        ],
      },
      {
        id: 2,
        title: '티몬 출시(판매) 상품 재고관리시스템',
        period: '2018.07 ~ 2018.09',
        descript: `사내 배송 제품을 관리하는 웹페이지 제작 추가 인원으로 참여 하였습니다.`,
        stack: 'NodeJS, Express, HTML, JQuery, MYSQL',
        experience: [
          {
            id: 1,
            detail: `주문, 환불 페이지 UI/UX 디자인 적용 및 주문, 백앤드 코드 작성`,
          },
        ],
      },
      {
        id: 3,
        title: '네이버 CLOVA 연동 AI 쇼핑 웹 서비스 프로토 타입 제작',
        period: '2018.05 ~ 2018.07',
        descript: `네이버 클로버의 음성인식 데이터에 따라 웹화면을 시각화(쇼핑 페이지)하는 서비스의 
        프로토 타입을 개발하였습니다. `,
        stack: 'NodeJS, Express, HTML, Javascript, Oauth2.0',
        experience: [
          {
            id: 1,
            detail: `Oauth2.0 토큰을 통한 연동`,
          },
          {
            id: 2,
            detail: `음성인식 패턴에 따른 분기 처리 및 데이터 시각화`,
          },
        ],
      },
      {
        id: 4,
        title: '레일바이크 안드로이드 어플리케이션 유지보수',
        period: '2018.04 ~ 2018.04',
        descript: `레일바이크 어플리케이션의 사용 권한 퍼미션 문제를 해결하였습니다.`,
        stack: 'Android(JAVA)',
        experience: [
          {
            id: 1,
            detail: `퍼미션 문제 해결 및 곡성 레일바이크 시승 테스트
            `,
          },
        ],
      },
      {
        id: 5,
        title: '프로젝트 라이프사이클 관리 시스템',
        period: '2018.01 ~ 2018.03',
        descript: `사내 중구난방 프로젝트를 정리하고 개발 현황을 체계적으로 확인하고 보고 할 수 있도록 
        제안하고 개발한 웹 서비스입니다. `,
        stack: 'NodeJS, Express, Pug, Javascript, MySQL',
        experience: [
          {
            id: 1,
            detail: `백엔드 & 프론트엔드 기술환경 구축 및 개발`,
          },
          {
            id: 2,
            detail: `프로젝트 상태를 5가지로 나누고, 상태에 따라 담당자에게 메일을 보내는 기능등을 제작`,
          },
        ],
      },
    ],
  },
];
