import { Controller, ControllerRequest } from '@declarations';
import { NextFunction, Request, Response } from 'express';
import { Session } from '@app/declarations/dependencies/session.interface';

export const requestHandler = (controller: Controller) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: ControllerRequest<unknown, unknown> = {
      query: req.query,
      params: req.params,
      body: req.body,
      headers: req.headers,
      session: req.session as unknown as Session,
    };

    try {
      const {
        headers,
        body,
        statusCode = 200,
      } = await controller.handle(httpRequest);

      if (headers) {
        res.set(headers);
      }

      res.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  };
};
