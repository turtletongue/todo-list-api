import { CustomError } from './custom-error';

export class BadRequestError extends CustomError {
  constructor(message?: string) {
    super(message);

    this.statusCode = 400;
  }
}
