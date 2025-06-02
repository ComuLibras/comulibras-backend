import { ZodError } from "zod";

import { HttpError } from "../errors/http-error";
import { INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE } from "../errors/internal-server-http-error";
import { IErrorMiddleware } from "../interfaces/error-middleware";
import { StatusCode } from "../status-code";

export class HandleApplicationErrorMiddleware implements IErrorMiddleware {
  handle(
    error: unknown,
  ): Http.Response<{
    messages: ({ field: string; message: string } | string)[];
  }> {
    console.log(error, "error");
    if (error instanceof ZodError) {
      return {
        statusCode: StatusCode.BAD_REQUEST,
        body: {
          messages: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
      };
    }

    if (error instanceof HttpError) {
      return {
        statusCode: error.statusCode,
        body: {
          messages: [error.message],
        },
      };
    }

    if (error instanceof Error) {
      return {
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        body: {
          messages: [INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE],
        },
      };
    }

    return {
      statusCode: StatusCode.INTERNAL_SERVER_ERROR,
      body: {
        messages: [INTERNAL_SERVER_HTTP_ERROR_DEFAULT_MESSAGE],
      },
    };
  }
}
