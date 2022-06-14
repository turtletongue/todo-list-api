import { Controller, ControllerRequest } from '@declarations';
import { PostAuthenticateDto } from './dto/post-authenticate.dto';

export class PostValidateController implements Controller {
  async handle(request: ControllerRequest<PostAuthenticateDto, unknown>) {
    return {
      body: {
        user: {
          ...request.session!.admin,
          hashedPassword: undefined,
        },
      },
      statusCode: 201,
    };
  }
}
