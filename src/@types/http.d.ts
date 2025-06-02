declare namespace Http {
  type Roles = import("../application/domain/accounts/entities/role").Roles;
  type StatusCode = import("../application/shared/http/status-code").StatusCode;

  type Request<
    TBody = Record<string, unknown>,
    TQuery = Record<string, unknown>,
    TParams = Record<string, unknown>,
    THeaders = Record<string, string>,
  > = {
    body: TBody;
    query: TQuery;
    params: TParams;
    headers: THeaders;
    account?: {
      id: string;
      role: Roles;
    };
  };

  type Response<TBody = Record<string, unknown>> = {
    statusCode: StatusCode;
    body?: TBody | null;
  };
}
