import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const signUpBody = z
  .object({
    name: z.string().min(1),
    email: z.string().email().min(1),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

export const signUpOpenAPIBody = generateSchema(signUpBody);

export type SignUpBody = z.infer<typeof signUpBody>;
