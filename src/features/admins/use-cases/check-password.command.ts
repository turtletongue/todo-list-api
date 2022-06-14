import { AdminsRepository } from '../repository/admins-repository.interface';
import { adminFactory } from '../entity';

import { Command } from '@declarations';
import { CheckPasswordDto } from './dto/check-password.dto';

export class CheckPasswordCommand implements Command {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  async execute({ username, password }: CheckPasswordDto) {
    const plainAdmin = await this.adminsRepository.findByUsername(username);

    const admin = await adminFactory.build(plainAdmin);

    return admin.isPasswordMatch(password);
  }
}
