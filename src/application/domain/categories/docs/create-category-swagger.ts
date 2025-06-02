import { generateSchema } from '@anatine/zod-openapi';
import { Operation } from 'swagger-jsdoc';
import { z } from 'zod';
import { Tags } from '../../../shared/docs/tags';

export const CATEGORY_ALREADY_EXISTS_ERROR = 'Categoria já existe';

export const createCategorySchema = z.object({
  name: z.string().min(1),
  color: z.string().min(1),
  icon: z.string().min(1),
});

export type CreateCategorySchema = z.infer<typeof createCategorySchema>;

export const createCategoryHttpSchema = generateSchema(createCategorySchema);

export const createCategorySwagger: Operation = {
  tags: [Tags.CATEGORIES],
  summary: 'Criar categoria',
  description: 'Cria uma nova categoria',
  security: [],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/CreateCategory' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Categoria criada com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/CreateCategoryResponse' },
        },
      },
    },
    '409': {
      description: 'Categoria já existe',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [CATEGORY_ALREADY_EXISTS_ERROR] },
        },
      },
    },
  },
};
