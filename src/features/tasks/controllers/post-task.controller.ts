import { AddTaskCommand } from '../use-cases/add-task.command';

import { Controller, ControllerRequest } from '@declarations';
import { PostTaskDto } from './dto/post-task.dto';

export class PostTaskController implements Controller {
  constructor(private readonly addTask: AddTaskCommand) {}

  async handle(request: ControllerRequest<PostTaskDto, unknown>) {
    const { email, username, text } = request.body;

    const task = await this.addTask.execute({
      email,
      username,
      text,
    });

    return {
      body: task,
      statusCode: 201,
    };
  }
}
