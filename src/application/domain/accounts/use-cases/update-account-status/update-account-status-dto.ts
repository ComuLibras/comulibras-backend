import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateAccountStatusParams = z.object({
  accountId: z.string().uuid(),
});

export type UpdateAccountStatusParams = z.infer<typeof updateAccountStatusParams>;

export const updateAccountStatusBody = z.object({
  isActive: z.boolean(),
});

export type UpdateAccountStatusBody = z.infer<typeof updateAccountStatusBody>;
export const updateAccountStatusOpenAPIBody = generateSchema(updateAccountStatusBody);
