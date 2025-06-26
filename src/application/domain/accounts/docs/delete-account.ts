import { Operation } from 'swagger-jsdoc';
import { Tags } from '@shared/docs/tags';
import { ACCOUNT_NOT_FOUND_ERROR } from './constants';

export const deleteAccountSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Deletar conta',
  description: 'Deleta uma conta',
  security: [],
  parameters: [
    {
      name: 'accountId',
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
      description: 'Conta deletada com sucesso',
    },
    '404': {
      description: 'Conta não encontrada',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [ACCOUNT_NOT_FOUND_ERROR] },
        },
      },
    },
  },
};
