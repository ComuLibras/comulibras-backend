import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';
import { CATEGORY_NOT_FOUND_ERROR } from './contants';

export const deleteCategorySwagger: Operation = {
  tags: [Tags.CATEGORIES],
  summary: 'Deletar categoria',
  description: 'Deleta uma categoria',
  security: [],
  parameters: [
    {
      name: 'categoryId',
      in: 'path',
      required: true,
    },
  ],
  responses: {
    '204': {
      description: 'Categoria deletada com sucesso',
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
