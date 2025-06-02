import { Roles } from '../../../domain/accounts/entities/role';
import { ForbiddenHTTPError } from '../errors/forbidden-http-error';
import { IData, IMiddleware } from '../interfaces/middleware';

export const ACCESS_FORBIDDEN_ERROR =
  'Acesso negado. Seu perfil não possui as permissões necessárias para esta ação.';

export class AuthorizationMiddleware implements IMiddleware {
  constructor(private readonly allowedRoles: Exclude<Roles, Roles.ADMIN>[]) {}

  async handle({ account }: Http.Request): Promise<Http.Response | IData> {
    if (!account) {
      throw new ForbiddenHTTPError(ACCESS_FORBIDDEN_ERROR);
    }

    const isAllowed =
      account.role === Roles.ADMIN ||
      this.allowedRoles.some((role) => account.role === role);

    if (!isAllowed) {
      throw new ForbiddenHTTPError(ACCESS_FORBIDDEN_ERROR);
    }

    return {
      data: {},
    };
  }
}
