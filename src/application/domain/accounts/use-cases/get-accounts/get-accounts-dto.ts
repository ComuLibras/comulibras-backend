import { z } from 'zod';

export const getAccountsQuery = z.object({
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
});

export type GetAccountsQuery = z.infer<typeof getAccountsQuery>;
