import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

export const CATEGORY_ALREADY_EXISTS_ERROR = 'Categoria já existe';

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
          schema: { $ref: '#/components/schemas/Category' },
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
