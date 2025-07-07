import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

import { SENTENCE_NOT_FOUND_ERROR } from './constants';

export const SENTENCE_ALREADY_EXISTS_ERROR = 'Já existe uma frase com o mesmo conteúdo nessa categoria';

export const updateSentenceSwagger: Operation = {
  tags: [Tags.SENTENCES],
  summary: 'Atualizar frase',
  description: 'Atualiza uma frase',
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
        schema: { $ref: '#/components/schemas/UpdateSentence' },
      },
    },
  },
  responses: {
    '200': {
      description: 'Frase atualizada com sucesso',
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
    '409': {
      description: 'Já existe uma frase com o mesmo conteúdo',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [SENTENCE_ALREADY_EXISTS_ERROR] },
        },
      },
    },
  },

};
