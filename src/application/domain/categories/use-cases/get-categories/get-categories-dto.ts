import { z } from 'zod';

export const getCategoriesQuery = z.object({
  search: z.string().optional(),
  includeFavorites: z.coerce.boolean().default(false),
});

export type GetCategoriesQuery = z.infer<typeof getCategoriesQuery>;
