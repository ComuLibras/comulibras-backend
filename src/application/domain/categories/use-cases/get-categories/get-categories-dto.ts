import { z } from 'zod';

export const getCategoriesQuery = z.object({
  search: z.string().optional(),
});

export type GetCategoriesQuery = z.infer<typeof getCategoriesQuery>;
