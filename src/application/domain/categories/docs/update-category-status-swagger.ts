import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';
import { CATEGORY_NOT_FOUND_ERROR } from './contants';

export const updateCategoryStatusSwagger: Operation = {
  tags: [Tags.CATEGORIES],
  summary: 'Atualizar status da categoria',
  description: 'Atualiza o status de uma categoria',
  security: [],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateCategoryStatus' },
      },
    },
  },
  parameters: [
    {
      name: 'categoryId',
      in: 'path',
      required: true,
    },
  ],
  responses: {
    '200': {
      description: 'Status da categoria atualizado com sucesso',
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
