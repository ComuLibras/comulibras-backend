import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';

export const updateSentencesCategorySwagger: Operation = {
  tags: [Tags.SENTENCES],
  summary: 'Atualizar categoria das frases',
  description: 'Atualiza a categoria de uma ou mais frases',
  security: [],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateSentencesCategory' },
      },
    },
  },
  responses: {
    '200': {
      description: 'Categoria das frases atualizada com sucesso',
      content: {
        'application/json': {
          schema: {
            type: 'array',
            items: { $ref: '#/components/schemas/Sentence' },
          },
        },
      },
    },
    '404': {
      description: 'Categoria não encontrada',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
        },
      },
    },
  },
};
