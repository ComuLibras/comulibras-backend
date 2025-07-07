
import { prismaClient } from '@shared/clients/prisma-client';

import { Category } from '../entities/category';
import { CategoryMapper } from '../mappers/category-mapper';
import { GetCategoriesService } from '../use-cases/get-categories/get-categories-service';

import { ICategoryRepository } from './category-repository';

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma = prismaClient) {}

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
    const { search, includeFavorites, account } = input;

    const categories = await this.prisma.category.findMany({
      include: {
        ...this.include,
        ...(includeFavorites && account ? this.includeFavorites(account.id) : {}),
      },
      where: {
        name: {
          contains: search,
          mode: 'insensitive',
        },
        isActive: input.onlyActive ? true : undefined,
      },
    });
    return categories.map(CategoryMapper.toDomain);
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
