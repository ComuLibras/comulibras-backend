import { Category } from '../entities/category';
import { type GetCategoriesService } from '../use-cases/get-categories/get-categories-service';

export interface ICategoryRepository {
  create(category: Category): Promise<void>;
  findAll(input: GetCategoriesService.Input): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Category | null>;
  favorite(categoryId: string, accountId: string): Promise<void>;
  unfavorite(categoryId: string, accountId: string): Promise<void>;
}
