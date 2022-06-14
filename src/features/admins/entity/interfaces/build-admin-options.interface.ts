import { Id } from '@declarations';

export interface BuildAdminOptions {
  id?: Id;
  username: string;
  password?: string;
  hashedPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
