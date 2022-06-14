import { removeUndefinedValues } from '@app/helpers/remove-undefined';
import { BadRequestError, NotAuthenticatedError } from '@errors';
import { EditTaskCommand } from '../use-cases/edit-task.command';

import { Controller, ControllerRequest } from '@declarations';
import { PatchTaskDto } from './dto/patch-task.dto';

export class PatchTaskController implements Controller {
  constructor(private readonly editTask: EditTaskCommand) {}

  async handle(request: ControllerRequest<PatchTaskDto, unknown>) {
    const id = request.params.id;

    if (!id) {
      throw new BadRequestError('Id must be provided');
    }

    const admin = request.session?.admin;

    if (!admin) {
      throw new NotAuthenticatedError();
    }

    const { text, status } = request.body;

    const task = await this.editTask.execute({
      id,
      ...removeUndefinedValues({ text, status }),
      isEditedByAdmin: text !== undefined,
    });

    return {
      body: task,
    };
  }
}
