import { idMaker, sanitize, emailValidator } from '@dependencies';
import { TaskFactory } from './task.factory';

export const taskFactory = Object.freeze(
  new TaskFactory(idMaker, sanitize, emailValidator),
);
