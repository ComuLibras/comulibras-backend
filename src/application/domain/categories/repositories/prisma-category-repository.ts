import { Prisma } from '@prisma/client';

import { prismaClient } from '@shared/clients/prisma-client';

import { Category } from '../entities/category';
import { CategoryMapper } from '../mappers/category-mapper';
import { GetCategoriesService } from '../use-cases/get-categories/get-categories-service';

import { ICategoryRepository } from './category-repository';

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma = prismaClient) {}

  async favorite(categoryId: string, accountId: string): Promise<void> {
    await this.prisma.userFavoriteCategory.create({
      data: {
        accountId,
        categoryId,
      },
    });
  }

  async unfavorite(categoryId: string, accountId: string): Promise<void> {
    await this.prisma.userFavoriteCategory.deleteMany({
      where: {
        accountId,
        categoryId,
      },
    });
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { name },
    });
    return category ? CategoryMapper.toDomain(category) : null;
  }

  async create(category: Category): Promise<void> {
    await this.prisma.category.create({
      data: CategoryMapper.toPersistence(category),
    });
  }

  async findAll(input: GetCategoriesService.Input): Promise<Category[]> {
    const { search, account, orderBy, orderDirection = 'asc', isActive, isFavorite } = input;

    const whereClause = {
      name: {
        contains: search,
        mode: 'insensitive' as const,
      },
      ...(isActive !== undefined && { isActive }),
      ...(isFavorite !== undefined && {
        userFavoriteCategories: {
          some: {
            accountId: {
              equals: account?.id,
            },
          },
        },
      }),
    };

    const orderByClause = orderBy ? this.getOrderByClause(orderBy, orderDirection) : { name: orderDirection };

    const categories = await this.prisma.category.findMany({
      include: {
        ...this.include,
        ...(account ? this.includeFavorites(account.id) : {}),
      },
      where: whereClause,
      orderBy: orderByClause,
    });

    return categories.map(CategoryMapper.toDomain);
  }

  private getOrderByClause(orderBy: string, orderDirection: string): Prisma.CategoryOrderByWithRelationInput {
    const direction = orderDirection as Prisma.SortOrder;

    switch (orderBy) {
      case 'name':
        return { name: direction };
      case 'count':
        return { sentences: { _count: direction } };
      case 'isActive':
        return { isActive: direction };
      default:
        return { name: direction };
    }
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    return category ? CategoryMapper.toDomain(category) : null;
  }

  async update(category: Category): Promise<void> {
    await this.prisma.category.update({
      where: { id: category.id },
      data: CategoryMapper.toPersistence(category),
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({
      where: { id },
    });
  }

  private include = {
    _count: {
      select: {
        sentences: true,
      },
    },
  };

  private includeFavorites(accountId: string) {
    return {
      userFavoriteCategories: {
        where: {
          accountId,
        },
        select: {
          id: true,
        },
      },
    };
  }
}
