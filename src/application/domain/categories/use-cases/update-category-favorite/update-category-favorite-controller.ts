import { CategoryHttpSchema, CategoryMapper } from '@domain/categories/mappers/category-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { type UpdateCategoryFavoriteBody, updateCategoryFavoriteBody, type UpdateCategoryFavoriteParams, updateCategoryFavoriteParams } from './update-category-favorite-dto';
import { UpdateCategoryFavoriteService } from './update-category-favorite-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateCategoryFavoriteBody, params: updateCategoryFavoriteParams })
export class UpdateCategoryFavoriteController extends Controller<CategoryHttpSchema> {
  constructor(
    @Inject('UpdateCategoryFavoriteService')
    private readonly updateCategoryFavoriteService: UpdateCategoryFavoriteService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateCategoryFavoriteBody, never, UpdateCategoryFavoriteParams>): Controller.HandleResponse<CategoryHttpSchema> {
    const category = await this.updateCategoryFavoriteService.execute({
      ...request.body,
      ...request.params,
      accountId: request.account?.id ?? '',
    });

    return CategoryMapper.toHttp(category);
  }
}
