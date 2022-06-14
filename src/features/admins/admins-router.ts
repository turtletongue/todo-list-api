import { Router } from 'express';

import { requestHandler } from '@middlewares';
import { authenticate } from '@dependencies';
import { adminController } from './controllers';

export const adminsRouter = Router();

adminsRouter.get('/', authenticate, requestHandler(adminController.findAdmins));

adminsRouter.get(
  '/:id',
  authenticate,
  requestHandler(adminController.getAdmin),
);

adminsRouter.post('/', authenticate, requestHandler(adminController.postAdmin));

adminsRouter.patch(
  '/:id',
  authenticate,
  requestHandler(adminController.patchAdmin),
);

adminsRouter.delete(
  '/:id',
  authenticate,
  requestHandler(adminController.deleteAdmin),
);
