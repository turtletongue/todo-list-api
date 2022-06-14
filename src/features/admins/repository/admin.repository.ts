import { NotFoundError } from '@errors';
import { Admin } from '../entity/admin.entity';
import { AdminModel } from './admin.model';
import { AdminNotFoundError } from './admin-not-found-error';

import { Id, Repository, FindOptions, PlainEntity } from '@declarations';

export class AdminRepository implements Repository<Admin> {
  async findAll({
    limit = 10,
    skip = 0,
    where,
    exclude = [],
  }: FindOptions<Admin>) {
    const { count, rows } = await AdminModel.findAndCountAll({
      limit,
      offset: skip,
      where,
      attributes: {
        exclude,
      },
      raw: true,
    });

    return { total: count, items: rows.map(this.mapRawModelToPlainEntity) };
  }

  async findById(id: Id) {
    const admin = await AdminModel.findByPk(id, {
      raw: true,
    });

    if (!admin) {
      throw new AdminNotFoundError(id);
    }

    return this.mapRawModelToPlainEntity(admin);
  }

  async findByUsername(username: string) {
    const admin = await AdminModel.findOne({
      where: {
        username,
      },
      raw: true,
    });

    if (!admin) {
      throw new NotFoundError(`Admin with username ${username} not found`);
    }

    return this.mapRawModelToPlainEntity(admin);
  }

  async create(plainEntity: PlainEntity<Admin>) {
    const admin = await AdminModel.create(plainEntity, {
      raw: true,
    });

    return this.mapRawModelToPlainEntity(admin.get({ plain: true }));
  }

  async update(id: Id, plainEntity: PlainEntity<Admin>) {
    const [affectedRowsCount, affectedRows] = await AdminModel.update(
      plainEntity,
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    if (affectedRowsCount === 0) {
      throw new AdminNotFoundError(id);
    }

    return this.mapRawModelToPlainEntity(affectedRows[0].get({ plain: true }));
  }

  async remove(id: Id) {
    const admin = await AdminModel.findByPk(id, {
      raw: true,
    });

    if (!admin) {
      throw new AdminNotFoundError(id);
    }

    await AdminModel.destroy({
      where: {
        id,
      },
    });

    return this.mapRawModelToPlainEntity(admin);
  }

  private mapRawModelToPlainEntity(raw: unknown) {
    return raw as PlainEntity<Admin>;
  }
}
