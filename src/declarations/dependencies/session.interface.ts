import { Admin } from '@features/admins/entity/admin.entity';
import { PlainEntity } from '../entities/plain-entity.type';

export interface Session {
  admin?: PlainEntity<Admin>;
  destroy: () => void;
}
