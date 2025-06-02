export interface IData {
  data: Record<string, unknown>;
}

export interface IMiddleware {
  handle(request: Http.Request): Promise<Http.Response | IData>;
}
