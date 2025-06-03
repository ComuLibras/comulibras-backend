import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';

export const CATEGORY_NOT_FOUND_ERROR = 'Categoria não encontrada';

export const updateCategorySwagger: Operation = {
  tags: [Tags.CATEGORIES],
  summary: 'Atualizar categoria',
  description: 'Atualiza uma categoria',
  security: [],
  parameters: [
    {
      name: 'categoryId',
      in: 'path',
      required: true,
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateCategory' },
      },
    },
  },
  responses: {
    '200': {
      description: 'Categoria atualizada com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Category' },
        },
      },
    },
    '404': {
      description: 'Categoria não encontrada',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [CATEGORY_NOT_FOUND_ERROR] },
        },
      },
    },
  },
};
