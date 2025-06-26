import { NextFunction, Request, Response } from 'express';

import { Controller } from '@shared/http/interfaces/controller';

export function routeAdapter(controller: Controller) {
  return async(request: Request, response: Response, next: NextFunction) => {
    try {
      const { statusCode, body } = await controller.execute({
        body: request.body,
        params: request.params,
        query: request.query,
        account: request.metadata?.account,
        headers: request.headers as Record<string, string>,
      });

      response.status(statusCode).json(body);
    } catch (error) {
      next(error);
    }
  };
}
