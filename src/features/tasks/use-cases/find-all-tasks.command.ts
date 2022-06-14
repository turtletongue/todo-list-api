import { Task } from '../entity/task.entity';

import { Repository, Command } from '@declarations';
import { FindAllTasksDto } from './dto/find-all-tasks.dto';

export class FindAllTasksCommand implements Command {
  constructor(private readonly tasksRepository: Repository<Task>) {}

  async execute({ limit, skip, sort }: FindAllTasksDto = {}) {
    return await this.tasksRepository.findAll({
      limit,
      skip,
      sort,
    });
  }
}
