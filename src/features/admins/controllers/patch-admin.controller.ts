import { removeUndefinedValues } from '@app/helpers/remove-undefined';
import { ForbiddenError, BadRequestError } from '@errors';
import { EditAdminCommand } from '../use-cases/edit-admin.command';

import { Controller, ControllerRequest } from '@declarations';
import { PatchAdminDto } from './dto/patch-admin.dto';

export class PatchAdminController implements Controller {
  constructor(private readonly editAdmin: EditAdminCommand) {}

  async handle(request: ControllerRequest<PatchAdminDto, unknown>) {
    const id = request.params.id;

    if (!id) {
      throw new BadRequestError('Id must be provided');
    }

    const authenticatedAdmin = request.session?.admin;

    if (!authenticatedAdmin || authenticatedAdmin.id !== id) {
      throw new ForbiddenError();
    }

    const { username, password } = request.body;

    const patchedAdmin = await this.editAdmin.execute({
      id,
      ...removeUndefinedValues({ username, password }),
    });

    return {
      body: patchedAdmin,
    };
  }
}
