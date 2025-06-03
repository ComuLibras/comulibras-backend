import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateAccountStatusBody = z.object({
  isActive: z.boolean(),
});

export type UpdateAccountStatusBody = z.infer<typeof updateAccountStatusBody>;

export const updateAccountStatusOpenAPIBody = generateSchema(updateAccountStatusBody);
