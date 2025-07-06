import { CATEGORY_NOT_FOUND_ERROR } from '@domain/categories/docs/contants';
import { ICategoryRepository } from '@domain/categories/repositories/category-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { DeleteCategoryParams } from './delete-category-dto';

@Injectable()
export class DeleteCategoryService implements IService<DeleteCategoryService.Input, DeleteCategoryService.Output> {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(input: DeleteCategoryService.Input): Promise<DeleteCategoryService.Output> {
    const categoryFound = await this.categoryRepo.findById(input.categoryId);

    if (!categoryFound) {
      throw new NotFoundHTTPError(CATEGORY_NOT_FOUND_ERROR);
    }

    await this.categoryRepo.delete(input.categoryId);
  }
}

export namespace DeleteCategoryService {
  export type Input = DeleteCategoryParams;
  export type Output = void;
}
