import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';

export const createSentenceBody = z.object({
  content: z.string().min(1, 'Conteúdo é obrigatório'),
  videoUrl: z.string().url().min(1, 'URL do vídeo é obrigatório'),
  categoryId: z.string().uuid().min(1, 'ID da categoria é obrigatório'),
});

export type CreateSentenceBody = z.infer<typeof createSentenceBody>;

export const createSentenceOpenAPIBody = generateSchema(createSentenceBody);
