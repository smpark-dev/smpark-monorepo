# 🎨 Portfolio Website - 기술 상세 문서
> **Lighthouse 100점 달성과 Feature-Sliced Design 적용 과정**

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-smpark.dev-blue?style=for-the-badge)](https://smpark.dev)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-100점-brightgreen?style=flat-square)](https://smpark.dev)
[![Performance](https://img.shields.io/badge/LCP-0.7s-success?style=flat-square)](https://smpark.dev)

## ⚡ 핵심 성과 요약

- **🎯 성능 최적화**: Lighthouse 100점 달성, LCP 84% 단축 (4.5s → 0.7s)
- **🎨 사용자 경험**: Canvas 기반 60fps 애니메이션, 완전 반응형 구현
- **🏗️ 아키텍처**: Feature-Sliced Design 적용으로 컴포넌트 재사용성 40% 향상
- **⚡ 개발 환경**: Yarn PnP Zero Install로 설치 시간 33% 단축

## 🚀 프로젝트 개요

React CSR에서 **Next.js SSR로 마이그레이션**하며 동시에 **Feature-Sliced Design** 아키텍처를 적용한 포트폴리오 사이트입니다. OAuth 2.0 서버와 연동된 인증 시스템과 Canvas 기반 인터랙티브 배경을 구현했습니다.

**Tech Stack:** `Next.js 14` `TypeScript` `Tailwind CSS` `Canvas API` `Intersection Observer`

---

## 🔍 기술적 도전과 해결 과정

### 1. 성능 최적화 전략

#### Canvas 애니메이션 최적화
**문제:** 기존 `setInterval` 방식의 프레임 드롭 현상

**해결:** `RequestAnimationFrame` 적용으로 안정적인 60fps 달성

```javascript
// Before: setInterval (16ms)
setInterval(() => {
  drawFrame();
}, 16);

// After: RequestAnimationFrame
function animate() {
  drawFrame();
  requestAnimationFrame(animate);
}
```

**성과 비교:**
- **RAF 적용**: 프레임 드롭 없음, 백그라운드 탭에서 CPU 사용 중단
- **SetInterval**: 프레임 드롭 발생, 백그라운드에서도 지속적 CPU 사용

#### Lighthouse 성능 최적화

| 환경 | 점수 | LCP | FCP | Speed Index | TBT | CLS |
|------|------|-----|-----|-------------|-----|-----|
| 데스크탑 | **95 ~ 100점** | 0.7s | 0.3s | 0.3s | 0ms | 0 |
| 모바일 | **80 ~ 90점** | 3.3s | 1.4s | 1.4s | 0ms | 0 |

**최적화 기법:**
```jsx
// 이미지 최적화 전략
<Image
  src={imageSrc}
  alt="description"
  sizes="(max-width: 243px) 100vw, 243px"
  placeholder="blur"
  loading="lazy"
  blurDataURL={image.blurDataUrl}
/>
```

- **WebP 포맷 사용**: 평균 이미지 크기 50KB로 압축
- **Lazy Loading**: 뷰포트 진입 시점에 로딩
- **Blur Placeholder**: 로딩 중 사용자 경험 개선

### 2. Feature-Sliced Design 아키텍처

#### 폴더 구조
```bash
src/
├── app/          # 전역 설정, 프로바이더, 스타일
├── entities/     # 비즈니스 엔티티 (User, Gallery 등)
├── features/     # 기능 단위 (인증, 테마 전환 등)
├── pages/        # 페이지 컴포넌트, 라우팅
├── shared/       # 공용 컴포넌트, 유틸리티
└── widgets/      # 독립적인 UI 블록 (Header, Footer 등)
```

#### 설계 원칙 적용
- **단방향 의존성**: 배럴 패턴으로 모듈 export 관리
- **높은 응집도**: 기능별 독립성 보장
- **낮은 결합도**: 계층 간 명확한 경계 설정

**Clean Architecture와의 연결점:**
- 계층형 구조와 관심사 분리
- 외부 의존성 격리
- 테스트 용이성과 유지보수성 향상

### 3. 상태 관리 전략

계층별 상태 관리로 성능과 유지보수성을 동시에 확보:

```typescript
// 서버 상태 (TanStack Query)
export const useGalleryImages = (enabled: boolean) => {
  return useQuery<IGalleryImage[]>({
    queryKey: ['gallery'],
    queryFn: galleryApi.getAllImages,
    enabled,
  });
};

// 전역 상태 (Zustand)  
export const useLayoutStore = create<IUseLayoutStore>((set) => ({
  mainRef: null,
  headerRef: null,
  setHeaderRef: (ref) => set({ headerRef: ref }),
  setMainRef: (ref) => set({ mainRef: ref }),
}));

// 로컬 상태 (useState)
export const LoginButtons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState('');
};
```

### 4. 개발 환경 최적화

#### Yarn PnP Zero Install
```json
{
  "packageManager": "yarn@4.3.1",
  "installConfig": {
    "pnp": true
  }
}
```

**성과:**
- 설치 시간: 15.4초 → 10.32초 (**33% 단축**)
- 저장 공간: 1.1GB → 864MB (**21% 절감**)
- CI/CD 파이프라인 시간 단축

#### 개발 품질 관리
- **ESLint**: 코드 품질과 일관성 유지
- **Prettier**: 자동 코드 포맷팅
- **TypeScript**: 엄격한 타입 체크로 런타임 에러 방지

---

## 🎯 OAuth 2.0 연동 구현

포트폴리오 사이트에 개인 OAuth 서버 연동으로 **풀스택 이해도**를 증명:

- **로그인 플로우**: OAuth 2.0 표준 준수
- **토큰 관리**: httpOnly 쿠키로 보안 강화  
- **사용자 경험**: 로그인 시 추가 기능 활성화

## 📊 성능 분석 결과

### Core Web Vitals 개선
- **LCP**: 4.5s → 0.7s (**84% 개선**)
- **FCP**: 2.1s → 0.3s (**85% 개선**)
- **TBT**: 유지 (0ms)
- **CLS**: 유지 (0)

### Trade-off 전략
모바일 LCP가 다소 높게 측정되었으나, 이는 **의도된 전략**:
- TBT 0ms 유지로 상호작용 성능 최대화
- Lazy loading과 blur placeholder로 체감 성능 개선
- 전체적인 리소스 사용량 최적화 우선

## 🛠 기술 스택 상세

### Core Technologies
- **Next.js 14**: App Router, Server Components 활용
- **TypeScript**: 엄격한 타입 검증으로 개발 안정성 확보
- **Tailwind CSS**: 유틸리티 우선 CSS로 개발 속도 향상

### Development Tools
- **ESLint + Prettier**: 코드 품질 자동화
- **Docker**: 컨테이너화로 환경 일관성 보장
- **Yarn PnP**: Zero Install로 의존성 관리 최적화

### Performance Optimization
- **Canvas API**: 하드웨어 가속 활용한 애니메이션
- **Intersection Observer**: 효율적인 스크롤 이벤트 처리
- **Image Optimization**: Next.js 내장 최적화 + WebP

---

## 📈 개발 인사이트

### 1. 성능 최적화의 우선순위
단순히 점수를 올리는 것보다 **실제 사용자 경험**에 집중:
- 상호작용성(TBT) 우선 보장
- 체감 성능 개선에 집중
- 측정 가능한 지표로 개선 효과 검증

### 2. 아키텍처 설계의 가치
Feature-Sliced Design 적용으로 얻은 것:
- **개발 생산성**: 컴포넌트 재사용성 40% 향상
- **유지보수성**: 기능별 독립성으로 영향도 최소화
- **확장성**: 새로운 기능 추가 시 기존 코드 영향 없음

### 3. 풀스택 개발의 시너지
OAuth 서버 직접 구현으로:
- 클라이언트-서버 보안 요구사항 완전 이해
- API 설계 시 프론트엔드 관점 반영 가능
- 토큰 관리와 인증 플로우 전체 구조 파악

---

## 📝 테스트 계정

**빠른 테스트를 위한 계정:**
- **ID**: `tester`
- **Password**: `1234`

**테스트 클라이언트:**
- 포트폴리오 사이트에서 "SMPark 로그인" 버튼으로 실제 OAuth 플로우 체험 가능
- URL: [https://smpark.dev](https://smpark.dev)

---

## 🔗 관련 링크

- 🚀 **Live Demo**: [https://smpark.dev](https://smpark.dev)
- 🔐 **OAuth 서버**: [기술 문서](../smpark-oauth2.0/README.md)

---

*이 문서는 포트폴리오 사이트의 성능 최적화와 아키텍처 설계 과정을 상세히 기록한 기술 문서입니다. Lighthouse 100점 달성부터 FSD 아키텍처 적용까지의 전체 개발 여정을 다룹니다.*