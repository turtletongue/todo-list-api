import { NotFoundError } from '@errors';

import { Id } from '@declarations';

export class AdminNotFoundError extends NotFoundError {
  constructor(id: Id) {
    super(`Admin with id ${id} not found`);
  }
}
