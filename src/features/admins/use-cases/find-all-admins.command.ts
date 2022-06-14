import { Command } from '@declarations';
import { FindAllAdminsDto } from './dto/find-all-admins.dto';
import { AdminsRepository } from '../repository/admins-repository.interface';

export class FindAllAdminsCommand implements Command {
  constructor(private readonly adminsRepository: AdminsRepository) {}

  async execute({ limit, skip }: FindAllAdminsDto = {}) {
    return await this.adminsRepository.findAll({
      limit,
      skip,
      exclude: ['hashedPassword'],
    });
  }
}
