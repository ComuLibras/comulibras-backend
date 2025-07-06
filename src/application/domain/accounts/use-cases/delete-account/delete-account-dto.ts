import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const deleteAccountParams = z.object({
  accountId: z.string().uuid(),
});

export type DeleteAccountParams = z.infer<typeof deleteAccountParams>;

export const deleteAccountOpenAPIBody = generateSchema(deleteAccountParams);
