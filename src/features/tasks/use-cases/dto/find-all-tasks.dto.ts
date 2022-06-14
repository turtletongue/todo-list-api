import { BaseFindAllDto } from '@declarations';

export interface FindAllTasksDto extends BaseFindAllDto {
  sort?: {
    field: string;
    direction: string;
  };
}
