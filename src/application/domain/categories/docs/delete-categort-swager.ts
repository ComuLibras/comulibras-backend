import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';

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
  },
};