import { FindAllAdminsCommand } from '../use-cases/find-all-admins.command';

import { Controller, ControllerRequest } from '@declarations';
import { FindAdminsDto } from './dto/find-admins.dto';

export class FindAdminsController implements Controller {
  constructor(private readonly findAllAdmins: FindAllAdminsCommand) {}

  async handle({
    query: { limit, skip },
  }: ControllerRequest<unknown, FindAdminsDto>) {
    const { total, items } = await this.findAllAdmins.execute({ limit, skip });

    return {
      body: {
        totalItems: total,
        items,
      },
    };
  }
}
