import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';
import { createCategoryBody } from '../create-category/create-category-dto';

export const updateCategoryBody = createCategoryBody.partial();

export type UpdateCategoryBody = z.infer<typeof updateCategoryBody>;

export const updateCategoryOpenAPIBody = generateSchema(updateCategoryBody);