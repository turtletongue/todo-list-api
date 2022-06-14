import { CustomError } from './custom-error';

export class NotAuthenticatedError extends CustomError {
  constructor(message?: string) {
    super(message || 'Not Authenticated');

    this.statusCode = 401;
  }
}
