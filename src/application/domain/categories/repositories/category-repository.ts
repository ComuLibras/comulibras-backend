import { Category } from '../entities/category';
import { GetCategoriesQuery } from '../use-cases/get-categories/get-categories-dto';

export interface ICategoryRepository {
  create(category: Category): Promise<void>;
  findAll(input: GetCategoriesQuery): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
  findByName(name: string): Promise<Category | null>;
}
