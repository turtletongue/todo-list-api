import { idMaker } from '@dependencies';
import { taskRepository } from '../repository';
import { AddTaskCommand } from './add-task.command';
import { EditTaskCommand } from './edit-task.command';
import { FindAllTasksCommand } from './find-all-tasks.command';
import { GetTaskByIdCommand } from './get-task-by-id.command';

export const taskService = Object.freeze({
  addTask: new AddTaskCommand(taskRepository),
  editTask: new EditTaskCommand(taskRepository, idMaker),
  findAllTasks: new FindAllTasksCommand(taskRepository),
  getTaskById: new GetTaskByIdCommand(taskRepository, idMaker),
});
