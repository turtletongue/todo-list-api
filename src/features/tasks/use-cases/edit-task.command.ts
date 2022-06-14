import { BadRequestError } from '@errors';
import { Task } from '../entity/task.entity';
import { taskFactory } from '../entity';

import { Repository, Command, IdMaker } from '@declarations';
import { UpdateTaskDto } from './dto/update-task.dto';

export class EditTaskCommand implements Command {
  constructor(
    private readonly tasksRepository: Repository<Task>,
    private readonly idMaker: IdMaker,
  ) {}

  async execute({ id, ...updatedProperties }: UpdateTaskDto) {
    if (!this.idMaker.validate(id)) {
      throw new BadRequestError('Invalid id');
    }

    const existingProperties = await this.tasksRepository.findById(id);

    const isEditedByAdmin =
      existingProperties.isEditedByAdmin || updatedProperties.isEditedByAdmin;

    const task = await taskFactory.build({
      ...existingProperties,
      ...updatedProperties,
      isEditedByAdmin,
      updatedAt: undefined,
    });

    const updatedTask = await this.tasksRepository.update(id, task.toPlain());

    return Object.freeze(updatedTask);
  }
}
