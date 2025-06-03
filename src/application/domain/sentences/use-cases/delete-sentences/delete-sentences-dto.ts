import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const deleteSentencesBody = z.object({
  sentenceIds: z.array(z.string().uuid()).min(1, 'IDs das frases são obrigatórios'),
});

export type DeleteSentencesBody = z.infer<typeof deleteSentencesBody>;

export const deleteSentencesOpenAPIBody = generateSchema(deleteSentencesBody);
