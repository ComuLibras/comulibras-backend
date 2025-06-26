import { Operation } from 'swagger-jsdoc';
import { Tags } from '@shared/docs/tags';

export const getAccountsSwagger: Operation = {
  tags: [Tags.ACCOUNTS],
  summary: 'Listar contas',
  description: 'Lista todas as contas',
  security: [],
  responses: {
    '200': {
      description: 'Contas listadas com sucesso',
      content: {
        'application/json': {
          type: 'array',
          schema: { $ref: '#/components/schemas/Account' },
        },
      },
    },
  },
};
