import { Id } from '@declarations';

export interface PlainAdmin {
  id: Id;
  username: string;
  hashedPassword?: string;
  createdAt: Date;
  updatedAt: Date;
}
