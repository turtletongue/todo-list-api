import { TaskStatus } from '../task-status.enum';

import { Id } from '@declarations';

export interface PlainTask {
  id: Id;
  username: string;
  email: string;
  text: string;
  status: TaskStatus;
  isEditedByAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}
