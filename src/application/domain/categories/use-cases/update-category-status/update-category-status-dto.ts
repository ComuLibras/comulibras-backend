import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateCategoryStatusParams = z.object({
  categoryId: z.string().uuid(),
});

export type UpdateCategoryStatusParams = z.infer<typeof updateCategoryStatusParams>;

export const updateCategoryStatusBody = z.object({
  isActive: z.boolean(),
});

export type UpdateCategoryStatusBody = z.infer<typeof updateCategoryStatusBody>;

export const updateCategoryStatusOpenAPIBody = generateSchema(updateCategoryStatusBody);
