import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

export const getCategoriesSwagger: Operation = {
  tags: [Tags.CATEGORIES],
  summary: 'Listar categorias',
  description: 'Lista todas as categorias',
  parameters: [
    {
      name: 'search',
      in: 'query',
      description: 'Buscar por nome da categoria',
      required: false,
      schema: {
        type: 'string',
      },
    },
    {
      name: 'orderBy',
      in: 'query',
      description: 'Campo para ordenação',
      required: false,
      schema: {
        type: 'string',
        enum: ['name', 'count', 'isActive'],
      },
    },
    {
      name: 'orderDirection',
      in: 'query',
      description: 'Direção da ordenação',
      required: false,
      schema: {
        type: 'string',
        enum: ['asc', 'desc'],
        default: 'asc',
      },
    },
    {
      name: 'isActive',
      in: 'query',
      description: 'Filtrar por status ativo (true = apenas ativas, false = apenas inativas, omitir = todas)',
      required: false,
      schema: {
        type: 'boolean',
      },
    },
  ],
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
