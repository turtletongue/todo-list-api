import { Router } from 'express';

import { requestHandler } from '@middlewares';
import { authenticate } from '@dependencies';
import { authenticationController } from './controllers';

export const authenticationRouter = Router();

authenticationRouter.post(
  '/',
  requestHandler(authenticationController.postAuthenticate),
);

authenticationRouter.post(
  '/validate',
  authenticate,
  requestHandler(authenticationController.postValidate),
);

authenticationRouter.post(
  '/log-out',
  authenticate,
  requestHandler(authenticationController.postLogout),
);
