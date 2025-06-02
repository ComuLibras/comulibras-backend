import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const createCategoryBody = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
  icon: z.string().min(1),
});

export type CreateCategoryBody = z.infer<typeof createCategoryBody>;

export const createCategoryOpenAPIBody = generateSchema(createCategoryBody);