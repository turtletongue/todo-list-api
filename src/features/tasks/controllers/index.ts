import { idMaker } from '@app/dependencies';
import { taskService } from '../use-cases';
import { FindTasksController } from './find-tasks.controller';
import { GetTaskController } from './get-task.controller';
import { PatchTaskController } from './patch-task.controller';
import { PostTaskController } from './post-task.controller';

export const taskController = Object.freeze({
  postTask: new PostTaskController(taskService.addTask),
  patchTask: new PatchTaskController(taskService.editTask),
  findTasks: new FindTasksController(taskService.findAllTasks),
  getTask: new GetTaskController(taskService.getTaskById),
});
