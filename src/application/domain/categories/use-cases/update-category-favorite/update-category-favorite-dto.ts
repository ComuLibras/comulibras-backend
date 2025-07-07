import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateCategoryFavoriteParams = z.object({
  categoryId: z.string().uuid(),
});

export type UpdateCategoryFavoriteParams = z.infer<typeof updateCategoryFavoriteParams>;

export const updateCategoryFavoriteBody = z.object({
  isFavorite: z.boolean(),
});

export type UpdateCategoryFavoriteBody = z.infer<typeof updateCategoryFavoriteBody>;

export const updateCategoryFavoriteOpenAPIBody = generateSchema(updateCategoryFavoriteBody);
