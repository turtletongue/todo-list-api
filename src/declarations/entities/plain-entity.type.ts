import { Entity } from './entity.interface';

export type PlainEntity<T extends Entity<unknown>> = Readonly<
  ReturnType<T['toPlain']>
>;
