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
      required: false,
      schema: {
        type: 'number',
      },
    },
    {
      name: 'perPage',
      in: 'query',
      required: false,
      schema: {
        type: 'number',
      },
    },
    {
      name: 'categoryId',
      in: 'query',
      required: false,
      schema: {
        type: 'string',
        format: 'uuid',
      },
    },
    {
      name: 'search',
      in: 'query',
      required: false,
      schema: {
        type: 'string',
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
