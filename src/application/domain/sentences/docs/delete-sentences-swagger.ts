import { Operation } from 'swagger-jsdoc';
import { Tags } from '../../../shared/docs/tags';

export const deleteSentencesSwagger: Operation = {
  tags: [Tags.SENTENCES],
  summary: 'Deletar frases',
  description: 'Deleta uma ou mais frases',
  security: [],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/DeleteSentences' },
      },
    },
  },
  responses: {
    '204': {
      description: 'Frases deletadas com sucesso',
    },
  },
};