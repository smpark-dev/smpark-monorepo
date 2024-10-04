import { Router, Request, Response } from 'express';

import auth from '@routes/authRoute';
import oauth from '@routes/oAuthRoute';

const route = Router();

/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: 사용자 인증 관련 엔드포인트
 *   - name: OAuth
 *     description: OAuth 인증 관련 엔드포인트
 *   - name: Main
 *     description: 메인 페이지 관련 엔드포인트
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: 메인 페이지
 *     tags: [Main]
 *     description: 사용자의 인증 상태에 따라 메인 페이지를 보여주거나 OAuth 등록 페이지로 리다이렉트합니다.
 *     responses:
 *       200:
 *         description: 메인 페이지가 성공적으로 렌더링됨
 *       302:
 *         description: 인증된 사용자는 OAuth 등록 페이지로 리다이렉트됨
 */
route.get('/', (req: Request, res: Response) => {
  if (req.cookies.auth_token) {
    res.redirect('/oauth/register');
  } else {
    res.render('main');
  }
});

route.use('/', auth);
route.use('/oauth', oauth);

export default route;
