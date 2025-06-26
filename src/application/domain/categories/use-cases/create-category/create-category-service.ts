import { CATEGORY_ALREADY_EXISTS_ERROR } from '@domain/categories/docs/create-category-swagger';
import { Category } from '@domain/categories/entities/category';
import { ICategoryRepository } from '@domain/categories/repositories/category-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { ConflictHTTPError } from '@shared/http/errors/conflict-http-error';
import { IService } from '@shared/http/interfaces/service';

import { CreateCategoryBody } from './create-category-dto';

@Injectable()
export class CreateCategoryService implements IService<CreateCategoryService.Input, CreateCategoryService.Output> {
  constructor(
    @Inject('CategoryRepository') private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(input: CreateCategoryService.Input): Promise<CreateCategoryService.Output> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(input.name);

    if (categoryAlreadyExists) {
      throw new ConflictHTTPError(CATEGORY_ALREADY_EXISTS_ERROR);
    }

    const category = new Category({
      name: input.name,
      color: input.color,
      icon: input.icon,
      isActive: true,
    });

    await this.categoryRepository.create(category);

    return category;
  }
}

export namespace CreateCategoryService {
  export type Input = CreateCategoryBody;
  export type Output = Category;
}
