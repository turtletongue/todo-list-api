import { Id } from '@declarations';

export interface UpdateAdminDto {
  id: Id;
  username?: string;
  password?: string;
}
