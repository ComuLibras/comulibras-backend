import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const deleteSentenceParams = z.object({
  sentenceId: z.string().uuid(),
});

export type DeleteSentenceParams = z.infer<typeof deleteSentenceParams>;

export const deleteSentenceOpenAPIParams = generateSchema(deleteSentenceParams);
