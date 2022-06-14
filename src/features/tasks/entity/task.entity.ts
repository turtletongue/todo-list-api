import { Id, Entity } from '@declarations';
import { PlainTask } from './interfaces/plain-task.interface';
import { TaskStatus } from './task-status.enum';

export class Task implements Entity<PlainTask> {
  constructor(
    private id: Id,
    private username: string,
    private email: string,
    private text: string,
    private status: TaskStatus,
    private isEditedByAdmin: boolean,
    private createdAt: Date,
    private updatedAt: Date,
  ) {}

  getId() {
    return this.id;
  }

  getUsername() {
    return this.username;
  }

  getEmail() {
    return this.email;
  }

  getText() {
    return this.text;
  }

  getStatus() {
    return this.status;
  }

  getIsEditedByAdmin() {
    return this.isEditedByAdmin;
  }

  getCreatedAt() {
    return this.createdAt;
  }

  getUpdatedAt() {
    return this.updatedAt;
  }

  toPlain() {
    return {
      id: this.getId(),
      username: this.getUsername(),
      email: this.getEmail(),
      text: this.getText(),
      status: this.getStatus(),
      isEditedByAdmin: this.getIsEditedByAdmin(),
      createdAt: this.getCreatedAt(),
      updatedAt: this.getUpdatedAt(),
    };
  }
}
