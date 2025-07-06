import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const deleteCategoryParams = z.object({
  categoryId: z.string().uuid(),
});

export type DeleteCategoryParams = z.infer<typeof deleteCategoryParams>;

export const deleteCategoryOpenAPIBody = generateSchema(deleteCategoryParams);
