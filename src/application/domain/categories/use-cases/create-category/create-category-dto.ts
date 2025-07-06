import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const createCategoryBody = z.object({
  name: z.string().min(1),
  color: z.string().regex(/^#([0-9a-fA-F]{6})$/, 'Color must be a valid hex color, e.g. #000000'),
  icon: z.string().min(1),
  isActive: z.boolean().default(true),
});

export type CreateCategoryBody = z.infer<typeof createCategoryBody>;

export const createCategoryOpenAPIBody = generateSchema(createCategoryBody);
