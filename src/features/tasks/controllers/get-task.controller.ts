import { BadRequestError } from '@errors';
import { GetTaskByIdCommand } from '../use-cases/get-task-by-id.command';

import { Controller, ControllerRequest } from '@declarations';

export class GetTaskController implements Controller {
  constructor(private readonly getTaskById: GetTaskByIdCommand) {}

  async handle(request: ControllerRequest<unknown, unknown>) {
    const id = request.params.id;

    if (!id) {
      throw new BadRequestError('Id must be provided');
    }

    const task = await this.getTaskById.execute({ id });

    return {
      body: task,
    };
  }
}
