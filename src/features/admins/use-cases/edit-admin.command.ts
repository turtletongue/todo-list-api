import { UnprocessableEntityError } from '@errors';
import { adminFactory } from '../entity';

import { Command } from '@declarations';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { AdminsRepository } from '../repository/admins-repository.interface';

export class EditAdminCommand implements Command {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  async execute({ id, ...updatedProperties }: UpdateAdminDto) {
    const existingProperties = await this.adminsRepository.findById(id);

    const admin = await adminFactory.build({
      ...existingProperties,
      ...updatedProperties,
      updatedAt: undefined,
    });

    const { items: adminsWithSameUsername } =
      await this.adminsRepository.findAll({
        limit: 1,
        where: {
          username: admin.getUsername(),
        },
      });

    if (adminsWithSameUsername[0] && adminsWithSameUsername[0].id !== id) {
      throw new UnprocessableEntityError('This username is already taken');
    }

    const updatedAdmin = await this.adminsRepository.update(
      id,
      admin.toPlain(),
    );

    return Object.freeze({
      ...updatedAdmin,
      hashedPassword: undefined,
    });
  }
}
