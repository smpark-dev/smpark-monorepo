import { Router } from 'express';

import { container } from '@configs/inversify';
import authBlockMiddleware from '@middleware/routeMiddleware/authBlockMiddleware';

import type { IAuthenticationController } from '@adapters-interfaces/controllers/IAuthenticationController';

const authenticationController = container.get<IAuthenticationController>(
  'IAuthenticationController',
);

const auth = Router();

/**
 * @swagger
 * /register:
 *   get:
 *     summary: 회원가입 페이지 렌더링
 *     tags: [Authentication]
 *     description: 비인증 사용자에게 회원가입 페이지를 보여줍니다.
 *     responses:
 *       200:
 *         description: 회원가입 페이지가 성공적으로 렌더링됨
 *       302:
 *         description: 이미 인증된 사용자는 OAuth 등록 페이지(/oauth/register)로 리다이렉트됨
 */
auth.get(
  '/register',
  authBlockMiddleware,
  authenticationController.renderRegisterPage.bind(authenticationController),
);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: 회원가입 처리
 *     tags: [Authentication]
 *     description: 비인증 사용자의 회원가입 정보를 처리합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 입력 데이터
 *       302:
 *         description: "이미 인증된 사용자는 OAuth 등록 페이지(/oauth/register)로 리다이렉트됨"
 */
auth.post(
  '/register',
  authBlockMiddleware,
  authenticationController.userRegister.bind(authenticationController),
);

/**
 * @swagger
 * /login:
 *   get:
 *     summary: 로그인 페이지 렌더링
 *     tags: [Authentication]
 *     description: 비인증 사용자에게 로그인 페이지를 보여줍니다.
 *     responses:
 *       200:
 *         description: 로그인 페이지가 성공적으로 렌더링됨
 *       302:
 *         description: "이미 인증된 사용자는 OAuth 등록 페이지(/oauth/register)로 리다이렉트됨"
 */
auth.get(
  '/login',
  authBlockMiddleware,
  authenticationController.renderLoginPage.bind(authenticationController),
);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: 사용자 로그인
 *     tags: [Authentication]
 *     description: 제공된 credentials를 사용하여 사용자 로그인을 시도합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *        200:
 *         description: "로그인 성공"
 *        400:
 *         description: "잘못된 요청 (예: 필수 필드 누락, 유효하지 않은 입력 형식)"
 *        401:
 *         description: "인증 실패 (예: 잘못된 credentials)"
 *        500:
 *         description: "서버 에러"
 */
auth.post(
  '/login',
  authBlockMiddleware,
  authenticationController.userLogin.bind(authenticationController),
);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: 로그아웃
 *     tags: [Authentication]
 *     description: 사용자 세션을 종료하고 로그아웃 처리합니다.
 *     responses:
 *       200:
 *         description: 로그아웃 성공
 *       500:
 *         description: 서버 에러
 */
auth.post('/logout', authenticationController.userLogout.bind(authenticationController));

export default auth;
