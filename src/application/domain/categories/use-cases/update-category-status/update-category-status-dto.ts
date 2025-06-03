import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateCategoryStatusBody = z.object({
  isActive: z.boolean(),
});

export type UpdateCategoryStatusBody = z.infer<typeof updateCategoryStatusBody>;

export const updateCategoryStatusOpenAPIBody = generateSchema(updateCategoryStatusBody);
