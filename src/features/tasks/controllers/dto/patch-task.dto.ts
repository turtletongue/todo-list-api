import { TaskStatus } from '../../entity/task-status.enum';

export interface PatchTaskDto {
  text?: string;
  status?: TaskStatus;
}
