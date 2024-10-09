import { Router, Request, Response } from 'express';

import auth from '@routes/authRoute';
import oauth from '@routes/oAuthRoute';

const route = Router();

route.get('/', (req: Request, res: Response) => {
  if (req.cookies['smpark-auth']) {
    res.redirect('/oauth/register');
  } else {
    res.render('main');
  }
});

route.use('/', auth);
route.use('/oauth', oauth);

export default route;
