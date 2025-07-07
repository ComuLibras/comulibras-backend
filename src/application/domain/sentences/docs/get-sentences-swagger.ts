import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

export const getSentencesSwagger: Operation = {
  tags: [Tags.SENTENCES],
  summary: 'Listar frases',
  description: 'Lista todas as frases',
  parameters: [
    {
      name: 'page',
      in: 'query',
      description: 'Página atual',
      required: false,
      schema: {
        type: 'number',
        default: 1,
      },
    },
    {
      name: 'perPage',
      in: 'query',
      description: 'Número de items por página',
      required: false,
      schema: {
        type: 'number',
        default: 10,
      },
    },
    {
      name: 'categoryId',
      in: 'query',
      description: 'ID da categoria para filtrar',
      required: false,
      schema: {
        type: 'string',
        format: 'uuid',
      },
    },
    {
      name: 'search',
      in: 'query',
      description: 'Buscar por conteúdo da frase',
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
        enum: ['content', 'categoryName', 'isActive'],
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
      description: 'Frases listadas com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Sentence' },
          },
        },
      },
    },
  },
};
