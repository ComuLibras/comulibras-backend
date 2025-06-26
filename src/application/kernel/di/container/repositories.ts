import { container } from '.';
import { PrismaAccountRepository } from '@domain/accounts/repositories/prisma-account-respository';
import { PrismaCategoryRepository } from '@domain/categories/repositories/prisma-category-repository';
import { PrismaSentenceRepository } from '@domain/sentences/repositories/prisma-sentence-respository';

export function registerRepositories() {
  container.register(PrismaAccountRepository, 'AccountRepository');
  container.register(PrismaCategoryRepository, 'CategoryRepository');
  container.register(PrismaSentenceRepository, 'SentenceRepository');
}
