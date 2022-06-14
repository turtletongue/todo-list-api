import { AddAdminCommand } from '../use-cases/add-admin.command';

import { Controller, ControllerRequest } from '@declarations';
import { PostAdminDto } from './dto/post-admin.dto';

export class PostAdminController implements Controller {
  constructor(private readonly addAdmin: AddAdminCommand) {}

  async handle(request: ControllerRequest<PostAdminDto, unknown>) {
    const { username, password } = request.body;

    const admin = await this.addAdmin.execute({ username, password });

    return {
      body: admin,
      statusCode: 201,
    };
  }
}
