import { Prisma, Category as RawCategory } from '../../../../../prisma/generated/prisma';
import { Category } from '../entities/category';

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
    };
  }

  static toHttp(domain: Category) {
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