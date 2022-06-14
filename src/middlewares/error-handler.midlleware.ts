import { CustomError } from '@errors';

import { NextFunction, Request, Response } from 'express';

export const errorHandler = (
  error: Error,
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!(error instanceof CustomError)) {
    return res.status(500).json({
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }

  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  });
};
