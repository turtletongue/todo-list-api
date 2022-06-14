import { Entity } from '../entities/entity.interface';
import { PlainEntity } from '../entities/plain-entity.type';

export interface FindOptions<T extends Entity<unknown>> {
  limit?: number;
  skip?: number;
  where?: Partial<PlainEntity<T>>;
  sort?: {
    field: string;
    direction: string;
  };
  exclude?: (keyof Partial<PlainEntity<T>>)[];
}
