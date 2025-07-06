import { CATEGORY_NOT_FOUND_ERROR } from '@domain/categories/docs/contants';
import { Category } from '@domain/categories/entities/category';
import { ICategoryRepository } from '@domain/categories/repositories/category-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { UpdateCategoryStatusBody, UpdateCategoryStatusParams } from './update-category-status-dto';

@Injectable()
export class UpdateCategoryStatusService implements IService<UpdateCategoryStatusService.Input, UpdateCategoryStatusService.Output> {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(input: UpdateCategoryStatusService.Input): Promise<UpdateCategoryStatusService.Output> {
    const category = await this.categoryRepo.findById(input.categoryId);

    if (!category) {
      throw new NotFoundHTTPError(CATEGORY_NOT_FOUND_ERROR);
    }

    category.updateStatus(input.isActive);

    await this.categoryRepo.update(category);

    return category;
  }
}

export namespace UpdateCategoryStatusService {
  export type Input = UpdateCategoryStatusBody & UpdateCategoryStatusParams;
  export type Output = Category;
}
