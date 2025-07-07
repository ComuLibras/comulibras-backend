import { z } from 'zod';

const categoryOrderByEnum = z.enum(['name', 'count', 'isActive']);
const orderDirectionEnum = z.enum(['asc', 'desc']);

export const getCategoriesQuery = z.object({
  search: z.string().optional(),
  orderBy: categoryOrderByEnum.optional(),
  orderDirection: orderDirectionEnum.default('asc'),
  isActive: z.coerce.boolean().optional(),
});

export type GetCategoriesQuery = z.infer<typeof getCategoriesQuery>;
export type CategoryOrderBy = z.infer<typeof categoryOrderByEnum>;
export type OrderDirection = z.infer<typeof orderDirectionEnum>;
