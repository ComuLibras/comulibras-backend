import { Operation } from 'swagger-jsdoc';
import { Tags } from '@shared/docs/tags';
import { ACCOUNT_NOT_FOUND_ERROR } from './constants';

export const updateAccountStatusSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Atualizar status da conta',
  description: 'Atualiza o status de uma conta',
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
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/UpdateAccountStatus' },
      },
    },
  },
  responses: {
    '200': {
      description: 'Status da conta atualizado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/Account' },
        },
      },
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
