import { SortFactory } from '@app/helpers/sort.factory';
import { FindAllTasksCommand } from '../use-cases/find-all-tasks.command';

import { Controller, ControllerRequest } from '@declarations';
import { FindTasksDto } from './dto/find-tasks.dto';

export class FindTasksController implements Controller {
  constructor(private readonly findAllTasks: FindAllTasksCommand) {}

  async handle({
    query: { limit, skip, sortDirection, sortField },
  }: ControllerRequest<unknown, FindTasksDto>) {
    const sortFactory = new SortFactory(
      ['username', 'email', 'status'],
      ['asc', 'desc'],
    );

    const { total, items } = await this.findAllTasks.execute({
      limit,
      skip,
      sort: sortFactory.build(sortField, sortDirection),
    });

    return {
      body: {
        totalItems: total,
        items,
      },
    };
  }
}
