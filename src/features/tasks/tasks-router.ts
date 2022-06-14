import { Router } from 'express';

import { requestHandler } from '@middlewares';
import { authenticate } from '@dependencies';
import { taskController } from './controllers';

export const tasksRouter = Router();

tasksRouter.get('/', requestHandler(taskController.findTasks));

tasksRouter.get('/:id', requestHandler(taskController.getTask));

tasksRouter.post('/', requestHandler(taskController.postTask));

tasksRouter.patch(
  '/:id',
  authenticate,
  requestHandler(taskController.patchTask),
);
