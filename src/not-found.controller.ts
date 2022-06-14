import { Controller } from '@declarations';

export class NotFoundController implements Controller {
  async handle() {
    return {
      body: {
        message: 'Not Found',
      },
      statusCode: 404,
    };
  }
}
