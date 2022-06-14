import { NotFoundError } from '@errors';
import { CheckPasswordCommand } from '@features/admins/use-cases/check-password.command';
import { GetAdminByUsernameCommand } from '@features/admins/use-cases/get-admin-by-username.command';
import { InvalidLoginOrPasswordError } from './invalid-login-or-password-error';

import { Controller, ControllerRequest } from '@declarations';
import { PostAuthenticateDto } from './dto/post-authenticate.dto';

export class PostAuthenticateController implements Controller {
  constructor(
    private readonly getAdminByUsername: GetAdminByUsernameCommand,
    private readonly checkPassword: CheckPasswordCommand,
  ) {}

  async handle(request: ControllerRequest<PostAuthenticateDto, unknown>) {
    const { username, password } = request.body;

    try {
      const isPasswordCorrect = await this.checkPassword.execute({
        username,
        password,
      });

      if (!isPasswordCorrect) {
        throw new InvalidLoginOrPasswordError();
      }
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new InvalidLoginOrPasswordError();
      }

      throw error;
    }

    const admin = await this.getAdminByUsername.execute({ username });

    if (request.session) {
      request.session.admin = admin;
    }

    return {
      body: {
        success: true,
      },
      statusCode: 201,
    };
  }
}
