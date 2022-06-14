import { Id } from '../id.type';
import { Entity } from '../entities/entity.interface';
import { FindOptions } from './find-options.interface';
import { PlainEntity } from '../entities/plain-entity.type';
import { FindAllResult } from './find-all-result.type';
import { PropertiesToExclude } from './properties-to-exclude.type';

export interface Repository<T extends Entity<unknown>> {
  findAll(options?: FindOptions<T>): Promise<FindAllResult<T>>;

  findById(id: Id, exclude?: PropertiesToExclude<T>): Promise<PlainEntity<T>>;

  create(
    plainEntity: PlainEntity<T>,
    exclude?: PropertiesToExclude<T>,
  ): Promise<PlainEntity<T>>;

  update(
    id: Id,
    plainEntity: PlainEntity<T>,
    exclude?: PropertiesToExclude<T>,
  ): Promise<PlainEntity<T>>;

  remove(id: Id, exclude?: PropertiesToExclude<T>): Promise<PlainEntity<T>>;
}
