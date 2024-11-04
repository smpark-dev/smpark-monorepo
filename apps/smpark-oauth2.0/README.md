# smPark OAuth2.0 Server

`smPark OAuth2.0 Server`는 3년 전 보안 공부를 위해 간단하게 만들었던 OAuth 2.0 서버를 클린 아키텍처와 도메인 주도 설계를 적용하여 리펙토링한 프로젝트입니다. 
README.md는 OAuth2.0에 대한 간단한 소개 및 사용방법, 아키텍처, 기타 설정 등에 대한 소개입니다.

## 주요 특징

- **클린 아키텍처 + 도메인 주도 설계**:
  역할에 따라 레이어를 구분하고 외부 레이어에서 내부 레이어로 흐르는 단방향 구조로 시스템을 설계했습니다. 이를 통해 모듈 간의 의존성을 줄여 유지보수성을 높이고, 코드 변경에 유연한 구조를 갖추고자 했습니다. 또한, OAuth 2.0 구현에 필요한 네 가지 핵심 도메인을 설정해 비즈니스 로직과 도메인 요구사항을 명확히 반영하여, 시스템의 복잡성을 효과적으로 관리하면서도 유연성과 확장성을 확보했습니다.

- **Yarn PnP (Zero Install)**:
  설치 시간 단축과 용량 최소화, CI/CD 시간을 줄이기 위해 Zero Install을 사용했습니다.

- **TypeScript**:
  엄격한 정적 타입 체크를 통해 코드의 안정성과 가독성을 향상했습니다.

- **MongoDB & Redis**:
  NoSQL(MongoDB)을 사용하여 데이터를 저장하고, Redis를 이용해 Refresh Token을 관리합니다. 일부 세션 관리도 포함됩니다.

- **ESLint**:
  코드 품질과 일관성을 유지하기 위해 린팅 규칙을 적용했습니다. 저장 시 단축키를 통해 자동으로 `--fix`를 실행하여 코드를 정리하고, Import 문을 정해진 규칙에 따라 정렬하도록 설정했습니다.

- **Docker**:
  컨테이너화를 통해 개발 및 배포 환경의 일관성을 보장했습니다.

- **JEST/Cypress**:
  - 서비스 로직에 대해 유닛 테스트를 진행했습니다.
  - OAuth 인증 성공 사례에 대해 E2E 테스트를 수행했습니다.

- **Github Action(CI/CD)**:
  - GitHub Actions를 통해 지속적 통합 및 배포 파이프라인을 구축했습니다.
  - 무료 배포 및 성능 최적화를 위해 가정 내 Windows 데스크탑에서 배포를 진행했습니다.
  - WSL(리눅스) 배포 대신 SSH를 통해 Windows 11 OS에서 직접 배포 했습니다.
  - CI는 개발 MacBook에서, CD는 Windows 데스크탑에서 실행됩니다.
  - 배포는 08:00 - 20:00 사이에만 이루어지며, 이 시간에 맞춰 데스크탑이 자동으로 구동 및 종료되도록 설정했습니다.

## Version

`smPark OAuth2.0 Server`_(v1.0.0)_

## IDE

<img alt="VSCode" src="https://img.shields.io/badge/VSCode-v1.91.1-007ACC.svg?&flat&logo=data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDVweCIgaGVpZ2h0PSI0NHB4IiB2aWV3Qm94PSIwIDAgNDQgNDQiIHZlcnNpb249IjEuMSI+CjxnIGlkPSJzdXJmYWNlMSI+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMTQuMTE3NjQ3JSw1My43MjU0OSUsNzkuMjE1Njg2JSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDEuMjU3ODEyIDE1LjczMDQ2OSBDIDEuMjU3ODEyIDE1LjczMDQ2OSAwLjIxNDg0NCAxNC45NjQ4NDQgMS40NjQ4NDQgMTMuOTQxNDA2IEwgNC4zNzg5MDYgMTEuMjkyOTY5IEMgNC4zNzg5MDYgMTEuMjkyOTY5IDUuMjEwOTM4IDEwLjM5ODQzOCA2LjA5Mzc1IDExLjE3NTc4MSBMIDMyLjk2NDg0NCAzMS44OTQ1MzEgTCAzMi45NjQ4NDQgNDEuODI4MTI1IEMgMzIuOTY0ODQ0IDQxLjgyODEyNSAzMi45NTMxMjUgNDMuMzkwNjI1IDMwLjk4NDM3NSA0My4yMTg3NSBaIE0gMS4yNTc4MTIgMTUuNzMwNDY5ICIvPgo8cGF0aCBzdHlsZT0iIHN0cm9rZTpub25lO2ZpbGwtcnVsZTpub256ZXJvO2ZpbGw6cmdiKDYuMjc0NTElLDQzLjkyMTU2OSUsNzAuMTk2MDc4JSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDguMTgzNTk0IDIyLjEzMjgxMiBMIDEuMjU3ODEyIDI4LjU0Njg3NSBDIDEuMjU3ODEyIDI4LjU0Njg3NSAwLjU0Njg3NSAyOS4wODU5MzggMS4yNTc4MTIgMzAuMDQ2ODc1IEwgNC40NzI2NTYgMzMuMDI3MzQ0IEMgNC40NzI2NTYgMzMuMDI3MzQ0IDUuMjM4MjgxIDMzLjg2MzI4MSA2LjM2NzE4OCAzMi45MTAxNTYgTCAxMy43MDcwMzEgMjcuMjQyMTg4IFogTSA4LjE4MzU5NCAyMi4xMzI4MTIgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMy4xMzcyNTUlLDQ2LjY2NjY2NyUsNzIuNTQ5MDIlKTtmaWxsLW9wYWNpdHk6MTsiIGQ9Ik0gMjAuMzQzNzUgMjIuMTg3NSBMIDMzLjA0Njg3NSAxMi4zMDg1OTQgTCAzMi45NjQ4NDQgMi40MjU3ODEgQyAzMi45NjQ4NDQgMi40MjU3ODEgMzIuNDIxODc1IDAuMjY5NTMxIDMwLjYxMzI4MSAxLjM5MDYyNSBMIDEzLjcwNzAzMSAxNy4wNTg1OTQgWiBNIDIwLjM0Mzc1IDIyLjE4NzUgIi8+CjxwYXRoIHN0eWxlPSIgc3Ryb2tlOm5vbmU7ZmlsbC1ydWxlOm5vbnplcm87ZmlsbDpyZ2IoMjMuNTI5NDEyJSw2MCUsODMuMTM3MjU1JSk7ZmlsbC1vcGFjaXR5OjE7IiBkPSJNIDMwLjk4NDM3NSA0My4yMzA0NjkgQyAzMS43MjI2NTYgNDQgMzIuNjE3MTg4IDQzLjc1IDMyLjYxNzE4OCA0My43NSBMIDQyLjUxNTYyNSAzOC43ODEyNSBDIDQzLjc4NTE1NiAzNy45MDIzNDQgNDMuNjA1NDY5IDM2LjgwODU5NCA0My42MDU0NjkgMzYuODA4NTk0IEwgNDMuNjA1NDY5IDcuMTQ0NTMxIEMgNDMuNjA1NDY5IDUuODQzNzUgNDIuMjk2ODc1IDUuMzkwNjI1IDQyLjI5Njg3NSA1LjM5MDYyNSBMIDMzLjcxNDg0NCAxLjE3OTY4OCBDIDMxLjgzOTg0NCAwIDMwLjYxMzI4MSAxLjM5MDYyNSAzMC42MTMyODEgMS4zOTA2MjUgQyAzMC42MTMyODEgMS4zOTA2MjUgMzIuMTkxNDA2IDAuMjM0Mzc1IDMyLjk2NDg0NCAyLjQyNTc4MSBMIDMyLjk2NDg0NCA0MS42NDg0MzggQyAzMi45NjQ4NDQgNDEuOTE3OTY5IDMyLjkxMDE1NiA0Mi4xODM1OTQgMzIuNzk2ODc1IDQyLjQyMTg3NSBDIDMyLjU3MDMxMiA0Mi44ODY3MTkgMzIuMDc4MTI1IDQzLjMyMDMxMiAzMC45MDIzNDQgNDMuMTM2NzE5IFogTSAzMC45ODQzNzUgNDMuMjMwNDY5ICIvPgo8L2c+Cjwvc3ZnPgo="/> <img alt="Node.js" src="https://img.shields.io/badge/Node.js-v20.14.0-339933.svg?&flat&logo=Node.js"/> <img alt="Express" src="https://img.shields.io/badge/Express-v4.19.2-333333.svg?&flat&logo=Express"/> <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg?&flat&logo=JavaScript"/> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-v5.5.2-3178C6.svg?&flat&logo=TypeScript"/> <img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-v6.7.0-47A248.svg?&flat&logo=MongoDB"/> <img alt="Redis" src="https://img.shields.io/badge/Redis-v4.7.0-FF4438.svg?&flat&logo=Redis"/> <img alt="Nginx" src="https://img.shields.io/badge/Nginx-v1.27.0-009639.svg?&flat&logo=nginx&logoColor=009639"/> <img alt="ESLint" src="https://img.shields.io/badge/ESLint-v9.5.0-6C54E6.svg?&flat&logo=ESLint&logoColor=6C54E6"/> <img alt="Prettier" src="https://img.shields.io/badge/Prettier-v3.3.2-F7B93E.svg?&flat&logo=Prettier"/> <img alt="Docker" src="https://img.shields.io/badge/Docker-v24.0.2-2496ED.svg?&flat&logo=Docker"/> <img alt="Yarn" src="https://img.shields.io/badge/Yarn-v4.3.1-2C8EBB.svg?&flat&logo=Yarn"/> <img alt="Git" src="https://img.shields.io/badge/Git-v2.40.1-F05032.svg?&flat&logo=Git"/> <img alt="Jest" src="https://img.shields.io/badge/Jest-v29.7.0-C21325.svg?&flat&logo=Jest&logoColor=C21325"/> <img alt="Cypress" src="https://img.shields.io/badge/Cypress-v13.13.0-00BFAA.svg?&flat&logo=Cypress"/>

- **Tool** - `VSCode` _(v1.91.1)_
- **Back End** - `Node.js` _(v20.14.0)_, `Express` _(v4.19.2)_
- **Front End** - `JavaScript` _(ES6+)_, `TypeScript` _(v5.5.2)_
- **Database & Session** - `MongoDB (Atlas)` _(v6.7.0)_, `Redis` _(v4.7.0)_
- **Web Server** - `Nginx` _(v1.27.0)_
- **Linting** - `ESLint` _(v9.5.0)_
- **Formatting** - `Prettier` _(v3.3.2)_
- **Containerization** - `Docker` _(v24.0.2)_
- **Package Management** - `Yarn` _(v4.3.1)_
- **Version Control** - `Git` _(v2.40.1)_
- **Testing** - `Jest` _(v29.7.0)_, `Cypress` _(v13.13.0)_
- **Deployment Environment** - `CI - macOS` _(v14.5 Sonoma on MacBook)_, `CD - Windows11` _(vWin11 Desktop)_

<br>

[📑[rfc6749]](https://datatracker.ietf.org/doc/html/rfc6749)의 구조와 권고를 베이스로 제작하였습니다.

[🚀[smpark.ddns.net]](https://smpark.ddns.net) 사이트 이동
<br>

## Flow (OAuth 2.0)

<img src="src/public/image/oauth-flow.png" alt='OAuth Flow'>

<br>

#### Word

OAuth2.0에서 쓰이는 용어 설명입니다.

- `Client ID (client_id)` - 클라이언트 애플리케이션 식별을 위한 공개된 식별자.
- `Client Secret (client_secret)` - 클라이언트 애플리케이션을 인증하기 위한 비밀 키.
- `Scope` - 클라이언트가 접근하려는 리소스 서버의 자원 범위.
- `Response_type` - OAuth2.0 인증 플로우 선택. 현재 Code만 지원.
- `Authorization Callback URL (redirect_uri)` - 권한 부여 코드 또는 액세스 토큰을 전달받을 클라이언트의 URL.
- `Homepage Address` - 클라이언트의 홈페이지 URI로 동의 취소 시 리다이렉트 주소로 사용.
- `Access Token` - 리소스 서버에서 보호된 자원에 접근하기 위한 토큰. 유효 기간 15분 설정.
- `Refresh Token` - 새로운 액세스 토큰을 발급받기 위한 토큰. 유효 시간 1일 설정.
- `State` - 요청과 응답의 상태를 유지하고 무결성을 검증하기 위한 고유한 문자열로 클라이언트가 생성하여 제공.
- `Authorization Code` - 사용자의 권한 인증 후 발급되는 일회용 코드. 클라이언트는 이 코드로 액세스 토큰 요청.

<br>

## Secure

`smPark OAuth2.0 Server`를 제작하면서 가장 중점을 두었던 부분은 보안입니다.
아래와 같은 보안 검증을 구현하였습니다.

<br>

- `CSP` : 웹 애플리케이션에서 실행될 수 있는 리소스의 출처를 제한하는 보안 메커니즘으로, 서버가 HTTP 헤더를 통해 브라우저에 전달하는 정책입니다. 미들웨어를 통해 접속 요청 시 인증된 URI에만 제한을 완화하도록 동적으로 설정했습니다.

- ```javascript
  const directives = helmet.contentSecurityPolicy.getDefaultDirectives();
  directives['form-action'] = ["'self'", addressUri];
  directives['script-src'] = ["'self'", addressUri];
  directives['connect-src'] = ["'self'", addressUri];
  directives['form-action'] = ["'self'", addressUri];
  directives['frame-ancestors'] = ["'none'"];

  helmet.contentSecurityPolicy({
    directives,
  })(req, res, next);
  ```


- `CSRF` : CSP의 form-action 설정으로 승인되지 않은 도메인으로의 폼 제출을 방지하며, state를 사용하여 CSRF 공격을 방지하고 요청 상태를 유지합니다. 이를 위해 httpOnly, secure, sameSite 등의 쿠키 설정을 통해 클라이언트 접근을 차단하고, HTTPS에서만 접근을 허용하여 CSRF 공격에 대비했습니다.
- ```javascript
   directives['form-action'] = ["'self'", addressUri];
   setCookie(res: Response, options: ICookieOptions): Response {
    const {
      name,
      value,
      maxAge = Number(this.env.loginCookieExpiresIn) * 1000,
      httpOnly = true,
      secure = this.env.nodeEnv === 'production',
      sameSite = 'lax',
    } = options;

    return res.cookie(name, value, {
      maxAge,
      httpOnly,
      secure,
      sameSite,
    });
  }
  

  try {
    const { redirect_uri, state } = req;
    const code = await this.codeGenerationUseCase.execute(id);

    return res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
  } catch (error) {
    next(error);
  }
  ```

<br>

- `redirect_uri` : 등록된 redirect_uri와 요청된 redirect_uri를 검증하여 위조된 redirect_uri로 인한 코드 탈취를 방지합니다. 이는 RFC 6819의 권장 사항을 따랐습니다.
  [[📑[rfc6819]](https://datatracker.ietf.org/doc/html/rfc6819#section-5.2.3.5)] 권고

  ```javascript
   if (tokenPrepare.redirect_uri !== clients.redirect_uri.getValue()) {
      throw new CustomError(401, ERROR_MESSAGES.VALIDATION.MISMATCH.REDIRECT_URI);
    }
  ```

<br>

- `xss` : CSP 설정을 통해 승인된 addressUri 외의 모든 스크립트 소스 로딩을 차단하여 XSS 공격을 방지합니다.

  ```javascript
  directives['script-src'] = ["'self'", addressUri];
  ```

<br>

- `DoS(Denial of Service)` : express-rate-limit 미들웨어를 사용해 특정 시간 동안 허용되는 요청 수를 제한하여 반복된 요청으로 인한 서버 마비를 방지했습니다.
  ```javascript
  const rateLimit = require('express-rate-limit');

  const rateLimiterMiddleware = rateLimit({
    windowMs: rateLimitWindowMs, // 1분
    max: maxRequestsPerWindow, // 1분 동안 최대 50번의 요청
    headers: true,
    message: ERROR_MESSAGES.RATE_LIMIT.EXCEEDED,
  });
  ```

<br>

- `Access Token & Refresh Token` : OAuth 2.0 인증 후 클라이언트에게 Access Token과 Refresh Token을 발급합니다. JWT 방식의 로그인으로 Access Token은 쿠키에, Refresh Token은 Redis에 저장하며, 프론트엔드로 토큰을 직접 전달하지 않는 방식을 통해 보안을 강화했습니다. Access Token의 유효 시간을 15분 이하로 설정해 탈취 시 피해를 최소화하며, 토큰 만료 시 Refresh Token으로 재발급하고 Refresh Token이 만료되면 재인증 절차를 거칩니다.

  ```javascript
  setCookie(res: Response, options: ICookieOptions): Response {
    const {
      name,
      value,
      maxAge = Number(this.envService.getLoginCookieExpiresIn()) * 1000,
      httpOnly = true,
      secure = this.envService.getNodeEnv() === 'production',
      sameSite = 'lax',
    } = options;

    return res.cookie(name, value, {
      maxAge,
      httpOnly,
      secure,
      sameSite,
    });
  }

  create(
    payload: ITokenPayload,
    options: ITokenOptions,
    tokenGenerator: IJsonWebTokenService,
  ) {
    return {
      accessToken: new AuthToken(
        tokenGenerator.generateToken(
          payload,
          options.accessToken.jwtSecretKey,
          options.accessToken.expiresIn,
        ),
      ),
      refreshToken: new AuthToken(
        tokenGenerator.generateToken(
          payload,
          options.refreshToken.jwtSecretKey,
          options.refreshToken.expiresIn,
        ),
      ),
    };
  }
  ```

<br>

## Usage

해당 사이트의 이용 방법 Flow 입니다.
1. 간단한 동작 확인은 [📝[smpark.dev]](https://smpark.dev)의 로그인 페이지에서 smpark 로그인을 선택하여 로그인하시면 됩니다
(ID:tester PW:1234)
2. OAuth2.0을 직접 연동하기 위해선 아래와 같은 준비가 필요합니다. 

#### Register

1. [📝[smpark.ddns.net]](https://smpark.ddns.net)에서 회원가입 후 로그인
2. Client ID, Client Secret 생성
3. Homepage Address, Authorization Callback URL, Check Required Information 항목 기재 후 등록

<img src="src/public/image/register.png" alt='OAuth 등록 페이지'>
<br>

#### Client 토큰 요청 (Example FE JavaScript Code)

1. Flow 1: 클라이언트 웹페이지에서 OAuth Server로 URI 전송

- `OAuth Server`의 정보를 원하는 클라이언트 웹페이지에서 아래와 같은 방식으로 URI를 보냅니다.
  혹은 Next Auth 패키지의 도움을 받아 전달하여도 가능합니다.

```javascript
const client_id = process.env.CLIENT_ID;
const redirect_uri = process.env.REDIRECT_URI; // OAuth Server로 리디렉션할 URI를 생성
const state = uuidv4();
const scope = 'openid name email';
const response_type = 'code';


// uri redirect -> method GET
const uri = `https://smpark.ddns.net/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}&response_type=${response_type}`;

window.location.href = uri;
```

2. Flow 1-1: `OAuth Server` 인증 과정 진행
   <br>
   <img src="src/public/image/login.png" alt='login page'>
   <br>

3. Flow 1-2: 클라이언트에게 Scope 범위에 따른 정보 제공 동의 여부 묻기
   <br>
   <br>
   <img src="src/public/image/consent.png" alt='consent page'>
   <br>

  <br>
4. Flow 2: 동의 후 클라이언트에게 code 전달(서버에서 자동으로 이루어짐)

<br>

```javascript
const { redirect_uri, state } = req;
const code = await this.codeGenerationUseCase.execute(id);

return res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
```

<br>

5. Flow 3: 클라이언트는 전달받은 code와 state를 파싱하여 token 요청

```javascript
const response = await axios.post('https://smpark.ddns.net/oauth/token', {
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  code,
  state,
  redirect_uri: process.env.REDIRECT_URI,
  grant_type: 'authorization_code',
});
```

5. Flow 4: `OAuth Server`는 받은 code를 검증하고 `access_token`과 `refresh_token`을 생성하여 클라이언트에 전달

```javascript
  const tokens = await this.tokenOAuthIssuanceUseCase.execute(ids);
  return res.json({
    access_token: tokens.accessToken,
    refresh_token: tokens.refreshToken,
    token_type: 'Bearer',
  });
```

6. Flow 5: 클라이언트는 `Resource Server`에 요청할 때 `access_token`을 포함

```javascript
const response = await axios.get('https://resource-server.example.com/scope', {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

7. Flow 6: 리소스 서버는 `access_token`을 검증하고 동의된 Scope와 요청 Scope에 따라 클라이언트에 정보 전달

```javascript
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  ... (검증) ...

  res.json({ userData });
```

#### Log

`winston`과 `margan`을 사용하여 접속과 에러 상황을 로그로 기록합니다. 또한, 콘솔에도 정보를 출력하여 개발을 원활하게 진행할 수 있도록 하였습니다.

```javascript
const consoleTransport = new winston.transports.Console({
  level: env.nodeEnv === 'production' ? 'warn' : 'debug',
  format: combine(colorize(), appendTimestamp({ tz: true }), simple()),
});
```

info.log
<img src="src/public/image/info-log.png" alt='info-log'>

<br>

error.log
<img src="src/public/image/error-log.png" alt='info-log'>

## ETC

### 1. Clean Architecture 

- **Infrastructure**  
  데이터베이스나 외부 API 통신 같은 외부 인프라와 관련된 구체적인 구현을 포함합니다. 이 레이어는 환경 설정과 외부 시스템과의 통신을 관리하여 애플리케이션의 외부 의존성을 처리합니다.

- **Interface-Adapter**  
  외부 인터페이스와 시스템 간 데이터 전달을 담당합니다. 웹 컨트롤러, DTO, API 엔드포인트 등이 위치하며 애플리케이션 레이어와의 중재 역할을 합니다. 이 레이어는 입력 데이터 검증을 수행하고 요청을 적절한 유스케이스로 전달합니다.

- **Application**  
  애플리케이션 서비스나 유스케이스를 정의하는 계층으로, 비즈니스 규칙에 따라 작업의 흐름을 조정합니다. 이 레이어는 핵심 로직을 포함하지 않으며, 주로 도메인 레이어와 상호작용하여 애플리케이션의 작업 단위(유스케이스)를 관리합니다. 트랜잭션 범위를 설정하거나 작업 순서를 제어하여 응집도 높은 유스케이스를 제공합니다.

- **Domain**  
  가장 내부에 위치한 계층으로, 핵심 비즈니스 로직과 규칙을 담당합니다. 엔티티, 값 객체, 도메인 서비스가 포함되며, 시스템의 비즈니스 규칙을 가장 순수한 형태로 유지합니다. 이 계층은 애플리케이션의 가장 중요한 도메인 로직을 캡슐화하여 외부와의 의존성을 최소화합니다.

### 2. Domain-Driven Design

**Domain-Driven Design (DDD)** 원칙을 적용하여 핵심 비즈니스 로직과 검증을 엔티티와 값 객체로 구현했습니다.

- **엔티티(Entity)**  
  루트 애그리거트(Aggregate Root)로서 외부와의 모든 통신을 담당하며, 외부 계층에서의 모든 요청은 엔티티를 통해 이루어집니다. 엔티티는 비즈니스 로직을 캡슐화하여 도메인의 일관성을 보장합니다.

- **값 객체(Value Object)**  
  엔티티 내에서만 동작하며, 변경 불가능한 속성을 통해 비즈니스 규칙을 표현합니다. 필요 시 엔티티에 포함되어 유효성 검사와 도메인 규칙을 수행합니다.


### 3. 의존성 주입, 의존성 역전

**Inversify** 라이브러리를 이용하여 컨테이너를 통해 의존성을 주입하고 자동으로 관리할 수 있도록 설정했습니다. 의존성 역전을 위해 추상화 계층의 위치를 조정했습니다.

### 4. 에러처리 및 로그 

**Custom Error** 간단한 Custom Error 클래스를 만들어 에러를 발생시키고, 필요한 데이터를 함께 전달할 수 있도록 했습니다. 최상위에서 한 번의 Try-Catch 블록을 사용하여 전역적으로 에러를 제어하며, 여기서 상태에 따라 로그를 처리했습니다.

### 5. 데이터 전송 

**DTO & Mappers** 외부 레이어(Interface-adapter)에서 내부 레이어(application)로 데이터를 전달할 때, DTO 클래스를 사용하여 기본적인 검증을 수행했습니다.
Service와 Repository 간 데이터를 주고받을 때는 Mapper를 사용하여 데이터를 값 객체 또는 엔티티로 변환하며, 이 변환 과정에서 도메인 규칙에 따른 상세한 검증을 거쳐 데이터를 전달하였습니다.

