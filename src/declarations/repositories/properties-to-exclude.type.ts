import { Entity } from '../entities/entity.interface';
import { PlainEntity } from '../entities/plain-entity.type';

export type PropertiesToExclude<T extends Entity<unknown>> = (keyof Partial<
  PlainEntity<T>
>)[];
