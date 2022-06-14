import { Admin } from '../entity/admin.entity';

import { Repository, Command } from '@declarations';
import { RemoveAdminDto } from './dto/remove-admin.dto';

export class RemoveAdminCommand implements Command {
  constructor(private readonly adminsRepository: Repository<Admin>) {}

  async execute({ id }: RemoveAdminDto) {
    const removedAdmin = await this.adminsRepository.remove(id);

    return Object.freeze({
      ...removedAdmin,
      hashedPassword: undefined,
    });
  }
}
