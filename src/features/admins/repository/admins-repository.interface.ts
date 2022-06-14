import { Admin } from '../entity/admin.entity';

import { PlainEntity, Repository, PropertiesToExclude } from '@declarations';

export interface AdminsRepository extends Repository<Admin> {
  findByUsername(
    username: string,
    exclude?: PropertiesToExclude<Admin>,
  ): Promise<PlainEntity<Admin>>;
}
