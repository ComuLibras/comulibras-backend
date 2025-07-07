import { z } from 'zod';

const accountOrderByEnum = z.enum(['name', 'email', 'role', 'isPasswordCreated', 'isActive']);
const orderDirectionEnum = z.enum(['asc', 'desc']);

export const getAccountsQuery = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
  orderBy: accountOrderByEnum.optional(),
  orderDirection: orderDirectionEnum.default('asc'),
  isActive: z.coerce.boolean().optional(),
});

export type GetAccountsQuery = z.infer<typeof getAccountsQuery>;
export type AccountOrderBy = z.infer<typeof accountOrderByEnum>;
export type OrderDirection = z.infer<typeof orderDirectionEnum>;
