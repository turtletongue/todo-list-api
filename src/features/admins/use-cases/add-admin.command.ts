import { BadRequestError, UnprocessableEntityError } from '@errors';
import { adminFactory } from '../entity';

import { Command } from '@declarations';
import { AddAdminDto } from './dto/add-admin.dto';
import { AdminsRepository } from '../repository/admins-repository.interface';

export class AddAdminCommand implements Command {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  async execute(addAdminDto: AddAdminDto) {
    if (!addAdminDto.password) {
      throw new BadRequestError('Password must be provided');
    }

    const admin = await adminFactory.build(addAdminDto);

    const { items: adminsWithSameUsername } =
      await this.adminsRepository.findAll({
        limit: 1,
        where: {
          username: admin.getUsername(),
        },
      });

    if (adminsWithSameUsername[0]) {
      throw new UnprocessableEntityError('This username is already taken');
    }

    const createdAdmin = await this.adminsRepository.create(admin.toPlain());

    return Object.freeze({
      ...createdAdmin,
      hashedPassword: undefined,
    });
  }
}
