import { z } from 'zod';

export const getSentencesQuery = z.object({
  categoryId: z.coerce.string().uuid().nullable().optional(),
  search: z.string().optional(),
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
  includeFavorites: z.coerce.boolean().default(false),
});

export type GetSentencesQuery = z.infer<typeof getSentencesQuery>;
