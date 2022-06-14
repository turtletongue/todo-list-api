import { NotFoundError } from '@errors';

import { Id } from '@declarations';

export class TaskNotFoundError extends NotFoundError {
  constructor(id: Id) {
    super(`Task with id ${id} not found`);
  }
}
