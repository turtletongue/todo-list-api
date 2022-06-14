import { BaseFindAllDto } from '@declarations';

export interface FindTasksDto extends BaseFindAllDto {
  sortField: 'username' | 'email' | 'status';
  sortDirection: 'asc' | 'desc';
}
