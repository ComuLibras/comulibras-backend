import { z } from 'zod';

const sentenceOrderByEnum = z.enum(['content', 'categoryName', 'isActive']);
const orderDirectionEnum = z.enum(['asc', 'desc']);

export const getSentencesQuery = z.object({
  categoryId: z.coerce.string().uuid().nullable().optional(),
  search: z.string().optional(),
  page: z.coerce.number().default(1),
  perPage: z.coerce.number().default(10),
  orderBy: sentenceOrderByEnum.optional(),
  orderDirection: orderDirectionEnum.default('asc'),
  isActive: z.coerce.boolean().optional(),
});

export type GetSentencesQuery = z.infer<typeof getSentencesQuery>;
export type SentenceOrderBy = z.infer<typeof sentenceOrderByEnum>;
export type OrderDirection = z.infer<typeof orderDirectionEnum>;
