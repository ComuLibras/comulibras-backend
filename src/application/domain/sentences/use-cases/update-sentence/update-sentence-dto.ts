import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

import { createSentenceBody } from '../create-sentence/create-sentence-dto';

export const updateSentenceParams = z.object({
  sentenceId: z.string().uuid(),
});

export type UpdateSentenceParams = z.infer<typeof updateSentenceParams>;

export const updateSentenceBody = createSentenceBody.partial();

export type UpdateSentenceBody = z.infer<typeof updateSentenceBody>;

export const updateSentenceOpenAPIBody = generateSchema(updateSentenceBody);
