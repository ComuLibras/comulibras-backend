import { CategoryHttpSchema, CategoryMapper } from '@domain/categories/mappers/category-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { UpdateCategoryBody, updateCategoryBody, UpdateCategoryParams, updateCategoryParams } from './update-category-dto';
import { UpdateCategoryService } from './update-category-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateCategoryBody, params: updateCategoryParams })
export class UpdateCategoryController extends Controller {

  constructor(
    @Inject('UpdateCategoryService')
    private readonly updateCategoryService: UpdateCategoryService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateCategoryBody, never, UpdateCategoryParams>): Promise<Controller.HandleResponse<CategoryHttpSchema>> {
    const category = await this.updateCategoryService.execute({
      ...request.body,
      ...request.params,
    });

    return CategoryMapper.toHttp(category);
  }
}
