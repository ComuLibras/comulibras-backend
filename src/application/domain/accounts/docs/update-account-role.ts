import { Operation } from 'swagger-jsdoc';

import { Tags } from '@shared/docs/tags';

import { ACCOUNT_NOT_FOUND_ERROR } from './constants';

export const updateAccountRoleSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Atualizar papel da conta',
  description: 'Atualiza o papel de uma conta',
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
        schema: { $ref: '#/components/schemas/UpdateAccountRole' },
      },
    },
  },
  responses: {
    '200': {
      description: 'Papel da conta atualizado com sucesso',
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
