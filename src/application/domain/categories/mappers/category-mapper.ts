import { generateSchema } from '@anatine/zod-openapi';
import z from 'zod';
import { Prisma, Category as RawCategory } from '@prisma/generated/prisma';
import { Category } from '../entities/category';

export const categoryHttpSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  sentenceCount: z.number().min(0),
  color: z.string().min(1),
  icon: z.string().min(1),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CategoryHttpSchema = z.infer<typeof categoryHttpSchema>;

export const categoryHttpSchemaOpenAPI = generateSchema(categoryHttpSchema);

export class CategoryMapper {
  static toDomain(raw: RawCategory): Category {
    return new Category({
      id: raw.id,
      name: raw.name,
      sentenceCount: raw.sentenceCount,
      color: raw.color,
      icon: raw.icon,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(domain: Category): Prisma.CategoryCreateInput {
    return {
      id: domain.id,
      name: domain.name,
      sentenceCount: domain.sentenceCount,
      color: domain.color,
      icon: domain.icon,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toHttp(domain: Category): CategoryHttpSchema {
    return {
      id: domain.id,
      name: domain.name,
      sentenceCount: domain.sentenceCount,
      color: domain.color,
      icon: domain.icon,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}
