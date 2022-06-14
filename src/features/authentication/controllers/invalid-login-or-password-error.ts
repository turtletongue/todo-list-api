import { NotAuthenticatedError } from '@errors';

export class InvalidLoginOrPasswordError extends NotAuthenticatedError {
  constructor() {
    super('Invalid login or password');
  }
}
