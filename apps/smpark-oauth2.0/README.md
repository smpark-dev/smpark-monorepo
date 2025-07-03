# 🔐 OAuth 2.0 Server - 기술 상세 문서
> **RFC-6749 표준 준수와 Clean Architecture 적용 과정**

[![Live Demo](https://img.shields.io/badge/🔐_Live_Demo-smpark.site-red?style=for-the-badge)](https://smpark.site)
[![Security](https://img.shields.io/badge/Security-RFC--6749-red?style=flat-square)](https://datatracker.ietf.org/doc/html/rfc6749)
[![Architecture](https://img.shields.io/badge/Architecture-Clean-orange?style=flat-square)](https://smpark.site)

## ⚡ 핵심 성과 요약

- **🛡️ 보안**: RFC-6749 표준 완전 준수, CSP/CSRF/XSS/DoS 방어 체계 구축
- **🏗️ 아키텍처**: Clean Architecture + DDD 적용으로 유지보수성 확보
- **🔄 실제 연동**: 포트폴리오 사이트와 완전 통합된 인증 시스템
- **⚙️ 토큰 관리**: Access/Refresh 토큰 이원화로 보안성과 사용성 동시 확보

## 🎯 프로젝트 동기

### 왜 OAuth 서버를 직접 구현했는가?

**"프론트엔드 개발자가 보안을 제대로 이해하려면 서버까지 구현해봐야 한다"**

- **보안 이해도 향상**: 클라이언트-서버 양측 보안 요구사항 완전 파악
- **T자형 개발자**: 프론트엔드 전문성과 백엔드 이해도를 갖춘 개발자로 성장
- **실무 적용**: 토큰 저장, CORS 설정 등 실제 프로젝트에서 마주치는 이슈 해결 경험
- **아키텍처 학습**: Clean Architecture와 DDD를 실제 프로젝트에 적용

**Tech Stack:** `Node.js` `Express` `MongoDB` `Redis` `JWT` `Clean Architecture`

---

## 🔍 기술적 도전과 해결 과정

### 1. 보안 구현 전략

#### 문제: 웹 애플리케이션의 다층 보안 위협
OAuth 서버는 민감한 사용자 정보와 토큰을 다루므로 철저한 보안 설계가 필수

#### 해결: 다중 보안 계층 구축

**🛡️ CSP (Content Security Policy)**
```javascript
// 동적 CSP 설정: 등록된 클라이언트만 허용
directives['form-action'] = ["'self'", addressUri];
directives['script-src'] = ["'self'", addressUri];
```
- 승인된 도메인에서만 리소스 로딩 허용
- XSS 공격 벡터 원천 차단

**🔒 CSRF 방어**
```javascript
// State 매개변수를 통한 요청 상태 검증
const { redirect_uri, state } = req;
const code = await this.codeGenerationUseCase.execute(id);
return res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
```
- httpOnly, secure, sameSite 쿠키 설정
- State 매개변수로 요청 무결성 검증

**⚡ DoS 방어**
```javascript
const rateLimiterMiddleware = rateLimit({
  windowMs: 60000, // 1분
  max: 50, // 최대 50회 요청
  message: ERROR_MESSAGES.RATE_LIMIT.EXCEEDED,
});
```

#### 성과: RFC-6819 보안 권장사항 완전 준수

### 2. Clean Architecture 설계

#### 문제: 복잡한 OAuth 플로우와 비즈니스 로직 관리
OAuth 2.0은 여러 단계의 인증 과정과 토큰 관리가 필요한 복잡한 시스템

#### 해결: 계층별 책임 분리

```
📁 src/
├── 🏗️ infrastructure/     # 외부 시스템 (DB, Redis, JWT)
├── 🔌 interface-adapter/  # 컨트롤러, DTO, 미들웨어
├── 💼 application/        # 유스케이스, 애플리케이션 서비스
└── 🧠 domain/            # 엔티티, 값 객체, 비즈니스 규칙
```

**Domain Layer: 핵심 비즈니스 로직**
```javascript
// 클라이언트 엔티티: 비즈니스 규칙을 도메인에서 검증
if (tokenPrepare.redirect_uri !== clients.redirect_uri.getValue()) {
  throw new CustomError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.REDIRECT_URI);
}
```

**Application Layer: 유스케이스 조정**
```javascript
// 토큰 발급 유스케이스: 비즈니스 플로우 조정
const tokens = await this.tokenOAuthIssuanceUseCase.execute(ids);
```

#### 성과: 테스트 용이성과 확장성 확보

### 3. 토큰 관리 전략

#### 문제: 보안성과 사용성의 균형
Access Token은 짧게, Refresh Token은 길게 설정해야 하는 딜레마

#### 해결: 이원화 토큰 시스템

**🔑 Access Token: httpOnly 쿠키 저장**
```javascript
setCookie(res, {
  name: 'access_token',
  value: accessToken,
  maxAge: 15 * 60 * 1000, // 15분
  httpOnly: true,
  secure: true,
  sameSite: 'lax'
});
```

**🔄 Refresh Token: Redis 저장**
```javascript
// 메모리 기반 고속 조회와 자동 만료
await redis.setex(`refresh_token:${userId}`, 86400, refreshToken); // 1일
```

#### 성과: 보안성 극대화 + 사용자 편의성 확보

---

## 🏗️ Domain-Driven Design 적용

### Aggregate Root 패턴
**클라이언트 엔티티**가 모든 OAuth 관련 비즈니스 로직의 진입점 역할:

```javascript
class Client extends AggregateRoot {
  // 외부에서의 모든 요청은 엔티티를 통해 처리
  validateRedirectUri(requestedUri) {
    if (this.redirectUri.getValue() !== requestedUri) {
      throw new ValidationError('Invalid redirect URI');
    }
  }
}
```

### Value Object로 도메인 규칙 표현
```javascript
class RedirectUri extends ValueObject {
  constructor(uri) {
    super();
    this.validateUri(uri); // 생성 시점에 검증
    this.value = uri;
  }
}
```

### 유비쿼터스 언어 사용
OAuth 도메인의 전문 용어를 코드에 그대로 반영:
- `AuthorizationCode`, `AccessToken`, `RefreshToken`
- `ClientCredentials`, `AuthorizationGrant`

---

### 핵심 엔드포인트 구현

**1. Authorization Endpoint**
```javascript
// GET /oauth/authorize
// RFC-6749 Section 4.1.1 준수
router.get('/authorize', validateAuthParams, renderAuthPage);
```

**2. Token Endpoint**  
```javascript
// POST /oauth/token
// RFC-6749 Section 4.1.3 준수
router.post('/token', validateTokenParams, issueTokens);
```

**3. Resource Endpoint**
```javascript
// GET /scope
// 토큰 검증 후 사용자 정보 제공
router.get('/scope', validateAccessToken, getUserInfo);
```

---

## 🔧 의존성 주입과 테스트 전략

### Inversify 컨테이너
```javascript
// 의존성 역전으로 테스트 용이성 확보
container.bind<ITokenRepository>(TYPES.TokenRepository)
  .to(MongoTokenRepository);

container.bind<ITokenService>(TYPES.TokenService)
  .to(JWTTokenService);
```

### 테스트 전략
- **단위 테스트**: Jest로 도메인 로직 검증
- **통합 테스트**: Cypress로 OAuth 플로우 E2E 테스트
- **보안 테스트**: 실제 CSRF, XSS 공격 시나리오 검증

---

## 📈 성능 및 모니터링

### 로깅 전략
```javascript
// Winston + Morgan으로 구조화된 로그
const logger = winston.createLogger({
  level: env.nodeEnv === 'production' ? 'warn' : 'debug',
  format: combine(colorize(), appendTimestamp({ tz: true }), simple()),
});
```

- **Access Log**: 모든 요청 추적
- **Error Log**: 보안 위협 및 시스템 오류 기록
- **Performance Log**: 토큰 발급 시간 모니터링

### Redis 캐싱
- Refresh Token 고속 조회
- Rate Limiting 카운터 관리
- 세션 상태 임시 저장

---

## 🎯 실제 연동 사례

### 포트폴리오 사이트 연동
```javascript
// 클라이언트 측 인증 플로우
const authUrl = `https://smpark.site/oauth/authorize?` +
  `client_id=${CLIENT_ID}&` +
  `redirect_uri=${REDIRECT_URI}&` +
  `state=${state}&` +
  `scope=openid name email`;

window.location.href = authUrl;
```

### 실제 사용 효과
- **사용자 경험**: 원클릭 로그인으로 편의성 확보
- **보안 강화**: 중앙집중식 인증으로 보안 정책 통일
- **확장성**: 다른 프로젝트에도 동일한 인증 시스템 적용 가능

---

## 📚 개발 인사이트

### 1. 보안은 여러 계층의 조합
단일 보안 기법이 아닌 **다층 방어**가 핵심:
- CSP + CSRF + Rate Limiting + 토큰 관리
- 각각이 하나의 보안 계층을 담당

### 2. 표준 준수의 가치
RFC-6749를 철저히 따르며 얻은 것:
- **호환성**: 기존 OAuth 클라이언트와 즉시 연동
- **신뢰성**: 검증된 보안 프로토콜 활용
- **확장성**: 표준 기반이므로 기능 확장 용이

### 3. 아키텍처 설계의 효과
Clean Architecture 적용으로:
- **테스트 용이성**: 각 계층별 독립적 테스트 가능
- **변경 용이성**: 외부 라이브러리 교체가 쉬움
- **이해도 향상**: 복잡한 OAuth 로직이 명확하게 분리됨

---

## 🚀 Quick Start

### 테스트 로그인
```bash
# 포트폴리오 사이트에서 바로 체험
1. https://smpark.dev 방문
2. "SMPark 로그인" 클릭  
3. ID: tester, PW: 1234 입력

# 또는 직접 OAuth 서버 접속
https://smpark.site
```

### API 연동 (간단 예제)
```javascript
// 1. 인증 URL로 리다이렉트
const authUrl = `https://smpark.site/oauth/authorize?client_id=${CLIENT_ID}&...`;

// 2. 토큰 발급 요청
const response = await fetch('https://smpark.site/oauth/token', {
  method: 'POST',
  body: JSON.stringify({ code, client_secret, ... })
});

// 3. 리소스 요청
const userData = await fetch('https://smpark.site/scope', {
  headers: { Authorization: `Bearer ${accessToken}` }
});
```

---

## 🔗 관련 링크

- 🔐 **Live Demo**: [https://smpark.site](https://smpark.site)
- 📖 **API 문서**: [Swagger UI](https://smpark.site/api-docs/)
- 🎨 **포트폴리오 연동**: [기술 문서](../smpark-space/README.md)

---

*이 문서는 OAuth 2.0 서버를 직접 구현하며 학습한 보안과 아키텍처 설계 과정을 상세히 다룹니다. RFC 표준 분석부터 실제 구현까지의 기술적 도전과 해결 과정을 기록했습니다.*
