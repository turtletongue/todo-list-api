import { CustomError } from './custom-error';

export class UnprocessableEntityError extends CustomError {
  constructor(message?: string) {
    super(message || 'Unprocessable Error');

    this.statusCode = 422;
  }
}
