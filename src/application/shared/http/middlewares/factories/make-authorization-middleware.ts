import { Roles } from '@domain/accounts/entities/role';

import { AuthorizationMiddleware } from '../authorization-middleware';

export function makeAuthorizationMiddleware(
  allowedRoles: Exclude<Roles, Roles.ADMIN>[] = [],
) {
  return new AuthorizationMiddleware(allowedRoles);
}
