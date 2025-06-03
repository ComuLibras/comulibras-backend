import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';

export const getCategoriesSwagger: Operation = {
  tags: [Tags.CATEGORIES],
  summary: 'Listar categorias',
  description: 'Lista todas as categorias',
  security: [],
  responses: {
    '200': {
      description: 'Categorias listadas com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Category' },
          },
        },
      },
    },
  },
};
