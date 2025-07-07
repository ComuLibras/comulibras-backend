declare namespace Http {
  type Roles = import("@domain/accounts/entities/role").Roles;
  type StatusCode = import("@shared/http/status-code").StatusCode;
  type Account = {
    id: string;
    role: Roles;
  }

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
    account?: Account;
  };

  type Response<TBody = Record<string, unknown>> = {
    statusCode: StatusCode;
    body?: TBody | null;
  };
}
