import { generateSchema } from '@anatine/zod-openapi';
import { Operation } from 'swagger-jsdoc';
import { z } from 'zod';
import { Tags } from '@shared/docs/tags';
import { Roles } from '../../accounts/entities/role';

export const INVALID_CREDENTIALS_ERROR = 'Credenciais inválidas';

export const signInSchema = z.object({
  accessToken: z.string().jwt(),
  role: z.nativeEnum(Roles),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signInHttpSchema = generateSchema(signInSchema);

export const signInSwagger: Operation = {
  tags: [Tags.AUTH],
  summary: 'Fazer loginnnn',
  description: 'Valida e-mail e senha do usuário e retorna um token de acesso',
  security: [],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/components/schemas/SignIn' },
      },
    },
  },
  responses: {
    '200': {
      description: 'Login efetuado com sucesso',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/SignInResponse' },
        },
      },
    },
    '401': {
      description: 'E-mail ou senha inválidos',
      content: {
        'application/json': {
          schema: { $ref: '#/components/schemas/ErrorsResponse' },
          example: { messages: [INVALID_CREDENTIALS_ERROR] },
        },
      },
    },
  },
};
