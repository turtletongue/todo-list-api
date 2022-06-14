import { ForbiddenError, BadRequestError } from '@errors';
import { RemoveAdminCommand } from '../use-cases/remove-admin.command';

import { Controller, ControllerRequest } from '@declarations';

export class DeleteAdminController implements Controller {
  constructor(private readonly removeAdmin: RemoveAdminCommand) {}

  async handle(request: ControllerRequest<unknown, unknown>) {
    const id = request.params.id;

    if (!id) {
      throw new BadRequestError('Id must be provided');
    }

    const authenticatedAdmin = request.session?.admin;

    if (!authenticatedAdmin || authenticatedAdmin.id !== id) {
      throw new ForbiddenError();
    }

    const removedAdmin = await this.removeAdmin.execute({
      id,
    });

    return {
      body: removedAdmin,
    };
  }
}
