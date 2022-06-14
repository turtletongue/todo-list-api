import { Controller, SessionFlusher } from '@declarations';

export class PostLogoutController implements Controller {
  constructor(private readonly sessionFlusher: SessionFlusher) {}

  async handle() {
    this.sessionFlusher.flush();

    return {
      body: {
        success: true,
      },
      statusCode: 200,
    };
  }
}
