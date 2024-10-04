import { Router } from 'express';

import { IClientsController } from '@adapters-interfaces/controllers/IClientsController';
import { IOAuthController } from '@adapters-interfaces/controllers/IOAuthController';
import { container } from '@configs/inversify';
import { IAuthenticationMiddleware } from '@middleware/interfaces/routeMiddleware/IAuthenticationMiddleware';
import dynamicSecurityMiddleware from '@middleware/routeMiddleware/dynamicSecurityMiddleware';

const oAuthController = container.get<IOAuthController>('IOAuthController');
const clientsController = container.get<IClientsController>('IClientsController');
const authenticationMiddleware = container.get<IAuthenticationMiddleware>(
  'IAuthenticationMiddleware',
);

const oauth = Router();

/**
 * @swagger
 * /oauth/register:
 *   get:
 *     summary: OAuth App 등록 페이지 조회
 *     tags: [OAuth]
 *     description: 인증된 사용자에게 OAuth 클라이언트 등록 페이지를 제공합니다. 사용자의 인증 상태에 따라 적절한 페이지로 리다이렉트될 수 있습니다.
 *     responses:
 *       200:
 *         description: OAuth 클라이언트 등록 페이지가 성공적으로 로드됨
 *       302:
 *         description: 인증이 필요한 경우 로그인 페이지로 리다이렉트
 *       401:
 *         description: 인증되지 않은 사용자
 */
oauth.get(
  '/register',
  authenticationMiddleware.handle,
  clientsController.renderClientRegistrationPage.bind(clientsController),
);

/**
 * @swagger
 * /oauth/register:
 *   post:
 *     summary: OAuth App 등록 페이지 데이터 등록
 *     tags: [OAuth]
 *     description: 인증된 사용자가 OAuth App 등록 페이지의 작성한 데이터를 등록합니다.
 *     responses:
 *       200:
 *         description: OAuth 등록 완료 메시지 전달
 *       302:
 *         description: 인증이 필요한 경우 로그인 페이지로 리다이렉트
 *       401:
 *         description: 인증되지 않은 사용자
 */
oauth.post(
  '/register',
  authenticationMiddleware.handle,
  clientsController.registerClientsDetail.bind(clientsController),
);

/**
 * @swagger
 * /oauth/credential:
 *   post:
 *     summary: OAuth App 등록 페이지의 Client_ID, Client_Secret, Client_API_KEY 생성
 *     tags: [OAuth]
 *     description: Auth App 등록 페이지에서 '생성하기' 버튼을 통해 Client_ID, Client_Secret, Client_API_KEY를 각각 생성합니다.
 *     responses:
 *       200:
 *         description: OAuth 등록 페이지에 Client_ID, Client_Secret, Client_API_KEY 정보 전달
 *       302:
 *         description: 인증이 필요한 경우 로그인 페이지로 리다이렉트
 *       401:
 *         description: 인증되지 않은 사용자
 *       500:
 *         description: 서버 에러
 */
oauth.post(
  '/credential',
  authenticationMiddleware.handle,
  clientsController.generateCredentials.bind(clientsController),
);

/**
 * @swagger
 * /oauth/authorize:
 *   get:
 *     summary: OAuth 2.0 인증 프로세스 시작 또는 계속
 *     tags: [OAuth]
 *     description: |
 *       클라이언트가 리소스 소유자의 인증을 요청하고 권한 부여를 얻기 위한 엔드포인트입니다. 이 엔드포인트는 OAuth 2.0 명세 (RFC 6749)를 준수합니다.
 *
 *       프로세스 흐름:
 *       1. 세션 확인
 *          - 유효한 세션이 있는 경우: step 2로 진행
 *          - 유효한 세션이 없는 경우: 로그인 페이지 제공
 *       2. 파라미터 검증
 *       3. 권한 부여 확인
 *          - 권한 부여 동의가 필요한 경우: 권한 부여 동의 페이지 제공
 *          - 권한 부여 동의가 필요없는 경우: Code 생성 프로세스로 리다이렉트
 *     parameters:
 *       - in: query
 *         name: response_type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [code]
 *         description: OAuth 2.0 인증 흐름을 지정합니다. 현재는 'code'(Authorization Code Flow)만 지원됩니다.
 *       - in: query
 *         name: client_id
 *         required: true
 *         schema:
 *           type: string
 *         description: 클라이언트 식별자.
 *       - in: query
 *         name: redirect_uri
 *         required: true
 *         schema:
 *           type: string
 *         description: 인증 서버가 인증 완료 후 사용자를 리다이렉트할 URI. 보안상의 이유로 필수로 요구됨.
 *       - in: query
 *         name: scope
 *         required: false
 *         schema:
 *           type: string
 *         description: 요청하는 접근 범위. 공백으로 구분된 문자열.
 *       - in: query
 *         name: state
 *         required: false
 *         schema:
 *           type: string
 *         description: 클라이언트의 요청 상태. CSRF 방지를 위해 사용 권장.
 *     responses:
 *       200:
 *         description: 로그인 페이지 또는 권한 부여 동의 화면 제공
 *       302:
 *         description: 권한 확인 및 권한 부여 동의 확인 후 인증 코드 발급 프로세스('/oauth/consent')로 리다이렉트
 *       400:
 *         description: 잘못된 요청 (필수 파라미터 누락)
 *       401:
 *         description: 잘못된 요청 (유효하지 않은 값)
 */
oauth.get(
  '/authorize',
  dynamicSecurityMiddleware,
  authenticationMiddleware.handle,
  oAuthController.verifyOauthRequest.bind(oAuthController),
  oAuthController.compareScope.bind(oAuthController),
);

/**
 * @swagger
 * /oauth/authorize:
 *   post:
 *     summary: OAuth 2.0 사용자 인증 처리
 *     tags: [OAuth]
 *     description: |
 *       OAuth 2.0 인증 흐름의 일부로, 사용자 인증을 처리합니다. 모든 OAuth 관련 파라미터와 사용자 인증 정보는 요청 본문에 포함됩니다.
 *
 *       프로세스 흐름:
 *       1. 파라미터 재검증
 *       2. 사용자 인증 처리
 *       3. 인증 성공 시 GET /oauth/authorize로 리다이렉트 정보 제공
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - password
 *               - response_type
 *               - client_id
 *               - redirect_uri
 *             properties:
 *               id:
 *                 type: string
 *                 description: 사용자의 아이디
 *               password:
 *                 type: string
 *                 description: 사용자의 비밀번호
 *               response_type:
 *                 type: string
 *                 description: OAuth 2.0 인증 흐름을 지정합니다. 현재는 'code'(Authorization Code Flow)만 지원됩니다.
 *               client_id:
 *                 type: string
 *                 description: 클라이언트 식별자.
 *               redirect_uri:
 *                 type: string
 *                 description: 인증 서버가 인증 완료 후 사용자를 리다이렉트할 URI. 보안상의 이유로 필수로 요구됨.
 *               scope:
 *                 type: string
 *                 description: 요청하는 접근 범위. 공백으로 구분된 문자열.
 *               state:
 *                 type: string
 *                 description: 클라이언트의 요청 상태. CSRF 방지를 위해 사용 강력 권장.
 *     responses:
 *       200:
 *         description: 인증 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "로그인 성공"
 *                 redirect:
 *                   type: string
 *                   example: "/oauth/authorize?client_id=example_client&redirect_uri=https://example.com/callback&state=xyz&scope=read&response_type=code"
 *       400:
 *         description: 잘못된 요청 (필수 파라미터 누락, 유효하지 않은 값 등)
 *       401:
 *         description: 인증 실패 (잘못된 사용자 이름 또는 비밀번호)
 */
oauth.post(
  '/authorize',
  oAuthController.verifyOauthRequest.bind(oAuthController),
  oAuthController.oAuthUserLogin.bind(oAuthController),
);

oauth.get(
  '/consent',
  authenticationMiddleware.handle,
  oAuthController.updateUserAgreedScope.bind(oAuthController),
  oAuthController.generateCode.bind(oAuthController),
);

oauth.post('/disagree', oAuthController.disagree.bind(oAuthController));

oauth.post(
  '/token',
  oAuthController.verifyTokenRequest.bind(oAuthController),
  oAuthController.generateAccessToken.bind(oAuthController),
);

export default oauth;
