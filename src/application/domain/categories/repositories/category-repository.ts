import { Category } from '../entities/category';

export interface ICategoryRepository {
  create(category: Category): Promise<void>;
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category | null>;
  update(category: Category): Promise<void>;
  delete(id: string): Promise<void>;
}
