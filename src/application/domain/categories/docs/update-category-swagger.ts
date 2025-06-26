import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

import { CATEGORY_NOT_FOUND_ERROR } from './contants';

export const CATEGORY_NAME_ALREADY_EXISTS_ERROR = 'Já existe uma categoria com este nome';

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
      schema: {
        type: 'string',
        format: 'uuid',
      },
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
    '409': {
      description: 'Já existe uma categoria com este nome',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [CATEGORY_NAME_ALREADY_EXISTS_ERROR] },
        },
      },
    },
  },
};
