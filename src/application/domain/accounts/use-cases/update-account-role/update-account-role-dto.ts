import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';
import { Roles } from '../../entities/role';

export const updateAccountRoleBody = z.object({
  role: z.nativeEnum(Roles),
});

export type UpdateAccountRoleBody = z.infer<typeof updateAccountRoleBody>;

export const updateAccountRoleOpenAPIBody = generateSchema(updateAccountRoleBody);
