import { BadRequestError } from '@errors';
import { GetAdminByIdCommand } from '../use-cases/get-admin-by-id.command';

import { Controller, ControllerRequest } from '@declarations';

export class GetAdminController implements Controller {
  constructor(private readonly getAdminById: GetAdminByIdCommand) {}

  async handle(request: ControllerRequest<unknown, unknown>) {
    const id = request.params.id;

    if (!id) {
      throw new BadRequestError('Id must be provided');
    }

    const admin = await this.getAdminById.execute({ id });

    return {
      body: admin,
    };
  }
}
