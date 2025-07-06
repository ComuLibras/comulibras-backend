import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

import { Roles } from '@domain/accounts/entities/role';

export const updateAccountRoleParams = z.object({
  accountId: z.string().uuid(),
});

export type UpdateAccountRoleParams = z.infer<typeof updateAccountRoleParams>;

export const updateAccountRoleBody = z.object({
  role: z.nativeEnum(Roles),
});

export type UpdateAccountRoleBody = z.infer<typeof updateAccountRoleBody>;
export const updateAccountRoleOpenAPIBody = generateSchema(updateAccountRoleBody);
