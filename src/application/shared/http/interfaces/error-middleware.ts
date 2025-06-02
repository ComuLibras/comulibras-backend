export interface IData {
  data: Record<string, unknown>;
}

export interface IErrorMiddleware {
  handle(error: unknown): Http.Response | IData;
}
