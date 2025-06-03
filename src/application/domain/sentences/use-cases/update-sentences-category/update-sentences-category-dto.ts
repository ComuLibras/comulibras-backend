import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const updateSentencesCategoryBody = z.object({
  categoryId: z.string().uuid().min(1, 'ID da categoria é obrigatório'),
  sentenceIds: z.array(z.string().uuid()).min(1, 'IDs das frases são obrigatórios'),
});

export type UpdateSentencesCategoryBody = z.infer<typeof updateSentencesCategoryBody>;

export const updateSentencesCategoryOpenAPIBody = generateSchema(updateSentencesCategoryBody);
