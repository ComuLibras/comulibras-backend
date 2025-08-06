import { z } from 'zod';

export const getSentenceByIdParams = z.object({
  sentenceId: z.string().uuid(),
});

export type GetSentenceByIdParams = z.infer<typeof getSentenceByIdParams>;
