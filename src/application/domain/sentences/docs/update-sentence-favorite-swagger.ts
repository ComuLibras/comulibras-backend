import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

import { SENTENCE_NOT_FOUND_ERROR } from './constants';

export const updateSentenceFavoriteSwagger: Operation = {
  tags: [Tags.SENTENCES],
  summary: 'Atualizar favorito da frase',
  description: 'Atualiza o status de favorito de uma frase',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateSentenceFavorite' },
      },
    },
  },
  responses: {
    '200': {
      description: 'Status de favorito da frase atualizado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Sentence' },
        },
      },
    },
    '404': {
      description: 'Frase não encontrada',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [SENTENCE_NOT_FOUND_ERROR] },
        },
      },
    },
  },
};
