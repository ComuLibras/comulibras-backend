import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

export const getSentenceByIdSwagger: Operation = {
  tags: [Tags.SENTENCES],
  summary: 'Buscar frase por ID',
  description: 'Busca uma frase pelo ID',
  parameters: [
    {
      name: 'sentenceId',
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
      description: 'Frase encontrada com sucesso',
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
