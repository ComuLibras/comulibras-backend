import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from '@shared/http/interfaces/middleware';

export function middlewareAdapter(middleware: IMiddleware) {
  return async(request: Request, response: Response, next: NextFunction) => {
    try {
      const result = await middleware.handle({
        body: request.body,
        query: request.query,
        params: request.params,
        account: request.metadata?.account,
        headers: request.headers as Record<string, string>,
      });

      if ('statusCode' in result) {
        response.status(result.statusCode).json(result.body);
        return;
      }

      request.metadata = {
        ...request.metadata,
        ...result.data,
      };

      next();
    } catch (error) {
      next(error);
    }
  };
}
