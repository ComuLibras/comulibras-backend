export type ErrorMessage = string;

export class HttpError extends Error {
  constructor(
    public readonly statusCode: Http.StatusCode,
    message?: ErrorMessage,
  ) {
    super(message);

    this.name = "HttpError";
  }
}
