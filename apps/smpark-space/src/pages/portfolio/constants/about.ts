import Book from '@public/imgs/icons/book.svg';
import Code from '@public/imgs/icons/code.svg';
import Cpu from '@public/imgs/icons/cpu.svg';
import Server from '@public/imgs/icons/server.svg';
import Shield from '@public/imgs/icons/shield.svg';
import Star from '@public/imgs/icons/star.svg';

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
