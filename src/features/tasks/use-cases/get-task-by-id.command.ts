import { UnprocessableEntityError } from '@errors';
import { Task } from '../entity/task.entity';

import { Repository, Command, IdMaker } from '@declarations';
import { GetTaskByIdDto } from './dto/get-task-by-id.dto';

export class GetTaskByIdCommand implements Command {
  constructor(
    private readonly tasksRepository: Repository<Task>,
    private readonly idMaker: IdMaker,
  ) {}

  async execute({ id }: GetTaskByIdDto) {
    if (!this.idMaker.validate(id)) {
      throw new UnprocessableEntityError('Invalid id');
    }

    const task = await this.tasksRepository.findById(id);

    return Object.freeze(task);
  }
}
