import { prismaClient } from '../../../shared/clients/prisma-client';
import { Category } from '../entities/category';
import { CategoryMapper } from '../mappers/category-mapper';
import { ICategoryRepository } from './category-repository';

export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma = prismaClient) {}

  async create(category: Category): Promise<void> {
    await this.prisma.category.create({
      data: CategoryMapper.toPersistence(category),
    });
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
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
}
