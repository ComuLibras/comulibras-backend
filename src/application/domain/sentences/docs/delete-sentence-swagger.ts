import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';
import { SENTENCE_NOT_FOUND_ERROR } from './constants';

export const deleteSentenceSwagger: Operation = {
  tags: [Tags.SENTENCES],
  summary: 'Deletar frase',
  description: 'Deleta uma frase',
  security: [],
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
    '204': {
      description: 'Frase deletada com sucesso',
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
