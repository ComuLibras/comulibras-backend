import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';

export const SENTENCE_ALREADY_EXISTS_ERROR = 'Frase já existe';

export const createSentenceSwagger: Operation = {
  tags: [Tags.SENTENCES],
  summary: 'Criar frase',
  description: 'Cria uma frase',
  security: [],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/CreateSentence' },
      },
    },
  },
  responses: {
    '201': {
      description: 'Frase criada com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Sentence' },
        },
      },
    },
    '409': {
      description: 'Frase já existe',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [SENTENCE_ALREADY_EXISTS_ERROR] },
        },
      },
    },
  },
};