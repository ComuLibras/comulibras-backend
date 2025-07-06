
import { CategoryHttpSchema, CategoryMapper } from '@domain/categories/mappers/category-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { GetCategoriesService } from './get-categories-service';

@Injectable()
@HttpResponse(StatusCode.OK)
export class GetCategoriesController extends Controller<CategoryHttpSchema[]> {
  constructor(
    @Inject('GetCategoriesService')
    private readonly getCategoriesService: GetCategoriesService,
  ) {
    super();
  }

  protected override async handle(): Controller.HandleResponse<CategoryHttpSchema[]> {
    const categories = await this.getCategoriesService.execute();

    return categories.map(CategoryMapper.toHttp);
  }
}
