export class CustomError extends Error {
  statusCode: number;

  constructor(message?: string) {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = 500;
  }
}
