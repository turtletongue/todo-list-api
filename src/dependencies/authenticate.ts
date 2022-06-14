import { NotAuthenticatedError } from '@errors';

import { Session } from '@declarations';
import { NextFunction, Request, Response } from 'express';

export const authenticate = (req: Request, _: Response, next: NextFunction) => {
  const session = req.session as unknown as Session;

  if (!session.admin) {
    return next(new NotAuthenticatedError());
  }

  next();
};
