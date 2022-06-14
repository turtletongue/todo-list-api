import { Entity } from '../entities/entity.interface';
import { PlainEntity } from '../entities/plain-entity.type';

export type FindAllResult<T extends Entity<any>> = {
  total: number;
  items: PlainEntity<T>[];
};
