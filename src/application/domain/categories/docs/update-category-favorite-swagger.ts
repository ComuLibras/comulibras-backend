import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

import { CATEGORY_NOT_FOUND_ERROR } from './contants';

export const updateCategoryFavoriteSwagger: Operation = {
  tags: [Tags.CATEGORIES],
  summary: 'Atualizar favorito da categoria',
  description: 'Atualiza o status de favorito de uma categoria',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateCategoryFavorite' },
      },
    },
  },
  parameters: [
    {
      name: 'categoryId',
      in: 'path',
      required: true,
      schema: {
        type: 'string',
        format: 'uuid',
      },
    },
  ],
  responses: {
    '200': {
      description: 'Status de favorito da categoria atualizado com sucesso',
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
