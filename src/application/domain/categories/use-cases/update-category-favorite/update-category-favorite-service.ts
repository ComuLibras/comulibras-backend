import { CATEGORY_NOT_FOUND_ERROR } from '@domain/categories/docs/contants';
import { Category } from '@domain/categories/entities/category';
import { ICategoryRepository } from '@domain/categories/repositories/category-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { UpdateCategoryFavoriteBody, UpdateCategoryFavoriteParams } from './update-category-favorite-dto';

@Injectable()
export class UpdateCategoryFavoriteService implements IService<UpdateCategoryFavoriteService.Input, UpdateCategoryFavoriteService.Output> {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(input: UpdateCategoryFavoriteService.Input): Promise<UpdateCategoryFavoriteService.Output> {
    const category = await this.categoryRepo.findById(input.categoryId);

    if (!category) {
      throw new NotFoundHTTPError(CATEGORY_NOT_FOUND_ERROR);
    }

    if (input.isFavorite) {
      await this.categoryRepo.favorite(category.id, input.accountId);
      category.updateFavorite(true);
    } else {
      await this.categoryRepo.unfavorite(category.id, input.accountId);
      category.updateFavorite(false);
    }

    return category;
  }
}

export namespace UpdateCategoryFavoriteService {
  export type Input = UpdateCategoryFavoriteBody & UpdateCategoryFavoriteParams & { accountId: string };
  export type Output = Category;
}
