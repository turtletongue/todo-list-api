import { UnprocessableEntityError } from '@errors';

import { Command, IdMaker } from '@declarations';
import { GetAdminByIdDto } from './dto/get-admin-by-id.dto';
import { AdminsRepository } from '../repository/admins-repository.interface';

export class GetAdminByIdCommand implements Command {
  constructor(
    private readonly adminsRepository: AdminsRepository,
    private readonly idMaker: IdMaker,
  ) {}

  async execute({ id }: GetAdminByIdDto) {
    if (!this.idMaker.validate(id)) {
      throw new UnprocessableEntityError('Invalid id');
    }

    const admin = await this.adminsRepository.findById(id);

    return Object.freeze({
      ...admin,
      hashedPassword: undefined,
    });
  }
}
