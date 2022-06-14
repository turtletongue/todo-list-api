import { Command } from '@declarations';
import { GetAdminByUsernameDto } from './dto/get-admin-by-username.dto';
import { AdminsRepository } from '../repository/admins-repository.interface';

export class GetAdminByUsernameCommand implements Command {
  constructor(private readonly usersRepository: AdminsRepository) {}

  async execute({ username }: GetAdminByUsernameDto) {
    const admin = await this.usersRepository.findByUsername(username, [
      'hashedPassword',
    ]);

    return Object.freeze(admin);
  }
}
