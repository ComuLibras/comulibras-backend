
import { Roles } from '@domain/accounts/entities/role';
import { CategoryHttpSchema, CategoryMapper } from '@domain/categories/mappers/category-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { GetCategoriesQuery, getCategoriesQuery } from './get-categories-dto';
import { GetCategoriesService } from './get-categories-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ query: getCategoriesQuery })
export class GetCategoriesController extends Controller<CategoryHttpSchema[]> {
  constructor(
    @Inject('GetCategoriesService')
    private readonly getCategoriesService: GetCategoriesService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<never, GetCategoriesQuery>): Controller.HandleResponse<CategoryHttpSchema[]> {
    const categories = await this.getCategoriesService.execute({
      account: request.account,
      onlyActive: request.account?.role === Roles.USER || !request.account,
      ...request.query,
    });

    return categories.map(CategoryMapper.toHttp);
  }
}
