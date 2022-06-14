import { TaskModel } from './task.model';
import { TaskNotFoundError } from './task-not-found-error';
import { Task } from '../entity/task.entity';

import { Id, Repository, FindOptions, PlainEntity } from '@declarations';

export class TaskRepository implements Repository<Task> {
  async findAll({
    limit = 10,
    skip = 0,
    where,
    sort,
    exclude = [],
  }: FindOptions<Task>) {
    const { count, rows } = await TaskModel.findAndCountAll({
      limit,
      offset: skip,
      where,
      attributes: {
        exclude,
      },
      order: sort ? [[sort.field, sort.direction]] : [],
      raw: true,
    });

    return { total: count, items: rows.map(this.mapRawModelToPlainEntity) };
  }

  async findById(id: Id) {
    const task = await TaskModel.findByPk(id, {
      raw: true,
    });

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    return this.mapRawModelToPlainEntity(task);
  }

  async create(plainEntity: PlainEntity<Task>) {
    const task = await TaskModel.create(plainEntity, {
      raw: true,
    });

    return this.mapRawModelToPlainEntity(task.get({ plain: true }));
  }

  async update(id: Id, plainEntity: PlainEntity<Task>) {
    const [affectedRowsCount, affectedRows] = await TaskModel.update(
      plainEntity,
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    if (affectedRowsCount === 0) {
      throw new TaskNotFoundError(id);
    }

    return this.mapRawModelToPlainEntity(affectedRows[0].get({ plain: true }));
  }

  async remove(id: Id) {
    const task = await TaskModel.findByPk(id, {
      raw: true,
    });

    if (!task) {
      throw new TaskNotFoundError(id);
    }

    await TaskModel.destroy({
      where: {
        id,
      },
    });

    return this.mapRawModelToPlainEntity(task);
  }

  private mapRawModelToPlainEntity(raw: unknown) {
    return raw as PlainEntity<Task>;
  }
}
