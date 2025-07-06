import { CATEGORY_NOT_FOUND_ERROR } from '@domain/categories/docs/contants';
import { CATEGORY_NAME_ALREADY_EXISTS_ERROR } from '@domain/categories/docs/update-category-swagger';
import { Category } from '@domain/categories/entities/category';
import { ICategoryRepository } from '@domain/categories/repositories/category-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { ConflictHTTPError } from '@shared/http/errors/conflict-http-error';
import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { UpdateCategoryBody, UpdateCategoryParams } from './update-category-dto';

@Injectable()
export class UpdateCategoryService implements IService<UpdateCategoryService.Input, UpdateCategoryService.Output> {
  constructor(
    @Inject('CategoryRepository') private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(input: UpdateCategoryService.Input): Promise<UpdateCategoryService.Output> {
    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new NotFoundHTTPError(CATEGORY_NOT_FOUND_ERROR);
    }

    if (input.name) {
      await this.validateName(input.name, category.id);
    }

    category.update(input);

    await this.categoryRepository.update(category);

    return category;
  }

  private async validateName(name: string, categoryId: string): Promise<void> {
    const categoryFoundByName = await this.categoryRepository.findByName(name);

    if (categoryFoundByName && categoryFoundByName.id !== categoryId) {
      throw new ConflictHTTPError(CATEGORY_NAME_ALREADY_EXISTS_ERROR);
    }
  }
}

export namespace UpdateCategoryService {
  export type Input = UpdateCategoryBody & UpdateCategoryParams;
  export type Output = Category;
}
