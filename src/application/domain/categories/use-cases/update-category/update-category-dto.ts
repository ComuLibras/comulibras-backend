import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

import { createCategoryBody } from '../create-category/create-category-dto';

export const updateCategoryParams = z.object({
  categoryId: z.string().uuid(),
});

export type UpdateCategoryParams = z.infer<typeof updateCategoryParams>;

export const updateCategoryBody = createCategoryBody.partial().omit({
  isActive: true,
});

export type UpdateCategoryBody = z.infer<typeof updateCategoryBody>;
export const updateCategoryOpenAPIBody = generateSchema(updateCategoryBody);
