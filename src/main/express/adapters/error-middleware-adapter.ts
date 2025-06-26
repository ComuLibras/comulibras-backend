import { NextFunction, Request, Response } from 'express';

import { IErrorMiddleware } from '@shared/http/interfaces/error-middleware';

export function errorMiddlewareAdapter(middleware: IErrorMiddleware) {
  return (
    error: unknown,
    _request: Request,
    response: Response,
    _next: NextFunction,
  ) => {
    const result = middleware.handle(error);

    if ('statusCode' in result) {
      response.status(result.statusCode).json(result.body);
    }
  };
}
