import { BadRequestError } from '@errors';
import { Task } from '../entity/task.entity';
import { taskFactory } from '../entity';

import { Repository, Command } from '@declarations';
import { AddTaskDto } from './dto/add-task.dto';

export class AddTaskCommand implements Command {
  constructor(private readonly tasksRepository: Repository<Task>) {}

  async execute(addTaskDto: AddTaskDto) {
    if (!addTaskDto.username) {
      throw new BadRequestError('Username must be provided');
    }

    if (!addTaskDto.email) {
      throw new BadRequestError('Email must be provided');
    }

    if (!addTaskDto.text) {
      throw new BadRequestError('Text must be provided');
    }

    const task = await taskFactory.build(addTaskDto);

    const createdTask = await this.tasksRepository.create(task.toPlain());

    return Object.freeze(createdTask);
  }
}
