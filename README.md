 🏗️ SMPark Monorepo
> 효율적인 개발 환경과 리소스 공유를 위한 통합 개발 workspace

## 📌 Overview
연관된 프로젝트들의 효율적인 관리와 리소스 공유를 위해 모노레포 아키텍처를 도입했습니다. Yarn Workspaces와 PnP를 활용하여 개발 환경을 통합하고 리소스를 최적화했습니다.

## 🗂️ Workspace
### Main Projects
- [🚀 Portfolio Site](apps/smpark-space/README.md)
- [🔐 OAuth2.0 Server](apps/smpark-oauth2.0/README.md)

### Internal Services
- 📦 Resource Server - OAuth2.0 리소스 제공 서비스

## ✨ Monorepo Advantages
### 💻 개발 효율성
<details open>
<summary><b>통합 실행 환경</b></summary>

모든 프로젝트 동시 실행 (yarn dev-all)
빌드 캐시 최적화로 빌드 시간 단축
패키지 실행 스크립트 표준화 </details>
<details open>
<summary><b>모듈 및 설정 공유</b></summary>

Yarn PnP를 통한 의존성 모듈 공유
ESLint/Prettier 설정 통일
TypeScript 설정 공통화 </details>
### 🔧 리소스 최적화
<details open>
<summary><b>CI/CD 파이프라인</b></summary>

GitHub Actions 워크플로우 통합
배포 프로세스 표준화
프로젝트별 독립적 버전 관리 </details>

## 🚀 Performance Improvements

### ⚡ Build & Execution
<details open>
<summary><b>빌드 시간 개선</b></summary>

- smpark-space[Next.js 14 + SWC]: 10s → 50ms (99.5% ⬇️)
- smpark-oauth2.0[esbuild]: 2s → 59ms (97.1% ⬇️)

> Nx 캐싱 시스템 도입으로 증분 빌드 시간을 대폭 단축했습니다.
</details>

<details open>
<summary><b>의존성 관리 마이그레이션 (Node_modules → Yarn PnP)</b></summary>

- 설치 시간: Node_modules 15.4초 → PnP 10.32초 (33% 단축)
- 저장 공간: Node_modules 1.1GB → PnP 864MB (21% 절감)
- Zero Install을 통한 CI/CD 파이프라인 시간 단축
</details>

### 🔄 CI/CD Pipeline & DevOps
> 효율적인 빌드 및 배포 프로세스를 통한 개발 생산성 향상
#### 🎯 빌드 최적화 전략
<details open>
<summary><b>영향도 기반 선별 빌드</b></summary>

- nx-set-shas로 변경사항 추적: base/head 커밋 비교를 통한 변경점 분석
- nx affected 기반 스마트 빌드: 변경된 프로젝트와 의존성이 있는 프로젝트만 선별
- 매트릭스 전략으로 프로젝트별 병렬 빌드: 빌드 파이프라인 처리량 향상
- 변경된 부분만 재빌드하여 리소스 절약 </details>

<details open>
<summary><b>캐시 시스템</b></summary>

- GitHub Actions의 캐시 최적화 (LFS, Next.js, NX)
- Docker 이미지 레이어 캐싱
- 빌드 아티팩트 재사용을 통한 빌드 시간 단축 </details>

#### 🌿 GitFlow & 배포 자동화

<details open>
<summary><b>브랜치 전략</b></summary>

- main: 프로덕션 배포용 브랜치
- feature/*: 기능 개발 브랜치
- Git 태그 기반 버전 관리 시스템 </details>

<details open>
<summary><b>자동화된 배포</b></summary>

- Docker 컨테이너 기반 배포
- 프로젝트별 독립 환경변수 관리
- Windows Desktop 환경으로의 자동 배포
- SSH를 통한 원격 배포 자동화 </details>

#### 🛡️ 품질 관리 & 보안

<details open>
<summary><b>코드 품질</b></summary>

- ESLint를 통한 코드 품질 검증
- TypeScript 타입 체크
- GitHub Actions를 통한 자동화된 린팅 </details>

<details open>
<summary><b>보안 관리</b></summary>

- GitHub Secrets를 통한 민감정보 관리
- 프로젝트별 독립된 환경변수 주입
- Docker 레지스트리 인증 자동화 </details>