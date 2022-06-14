import { UnprocessableEntityError } from '@errors';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

import { EmailValidator, IdMaker, Sanitize } from '@declarations';
import { BuildTaskOptions } from './interfaces/build-task-options.interface';

export class TaskFactory {
  constructor(
    private readonly idMaker: IdMaker,
    private readonly sanitize: Sanitize,
    private readonly emailValidator: EmailValidator,
  ) {}

  async build({
    id = this.idMaker.make(),
    username,
    email,
    text,
    status = TaskStatus.inProgress,
    isEditedByAdmin = false,
    createdAt = new Date(),
    updatedAt = new Date(),
  }: BuildTaskOptions): Promise<Readonly<Task>> {
    if (!this.idMaker.validate(id)) {
      throw new UnprocessableEntityError('Task must have a valid id');
    }

    const sanitizedUsername = this.sanitize(username);

    if (sanitizedUsername.length === 0) {
      throw new UnprocessableEntityError('Title should not be empty');
    }

    if (!this.emailValidator.isValid(email)) {
      throw new UnprocessableEntityError('Invalid email');
    }

    const sanitizedEmail = this.sanitize(email);

    if (sanitizedEmail.length === 0) {
      throw new UnprocessableEntityError('Email should not be empty');
    }

    const sanitizedText = this.sanitize(text);

    if (sanitizedText.length === 0) {
      throw new UnprocessableEntityError('Text should not be empty');
    }

    if (![TaskStatus.inProgress, TaskStatus.done].includes(status)) {
      throw new UnprocessableEntityError('Invalid status');
    }

    return Object.freeze(
      new Task(
        id,
        sanitizedUsername,
        sanitizedEmail,
        sanitizedText,
        status,
        isEditedByAdmin,
        createdAt,
        updatedAt,
      ),
    );
  }
}
