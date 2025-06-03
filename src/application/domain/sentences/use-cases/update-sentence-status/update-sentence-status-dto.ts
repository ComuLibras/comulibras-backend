import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateSentenceStatusBody = z.object({
  isActive: z.boolean(),
});

export type UpdateSentenceStatusBody = z.infer<typeof updateSentenceStatusBody>;

export const updateSentenceStatusOpenAPIBody = generateSchema(updateSentenceStatusBody);
