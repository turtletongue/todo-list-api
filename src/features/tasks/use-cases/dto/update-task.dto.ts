import { TaskStatus } from '../../entity/task-status.enum';

import { Id } from '@declarations';

export interface UpdateTaskDto {
  id: Id;
  title?: string;
  description?: string;
  status?: TaskStatus;
  isEditedByAdmin?: boolean;
}
