import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

import { Roles } from '@domain/accounts/entities/role';

export const createAccountBody = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  role: z.nativeEnum(Roles).default(Roles.USER),
  password: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
});

export type CreateAccountBody = z.infer<typeof createAccountBody>;

export const createAccountOpenAPIBody = generateSchema(createAccountBody);
