import { Admin } from '@features/admins/entity/admin.entity';

import { PlainEntity } from '../entities/plain-entity.type';
import { Id } from '../id.type';

export interface ControllerRequest<K, V> {
  body: K;
  headers: Record<string, unknown>;
  query: V;
  params: {
    id?: Id;
    [key: string]: unknown;
  };
  session?: { admin?: PlainEntity<Admin>; destroy: () => void };
}
