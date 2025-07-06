
import { CategoryHttpSchema, CategoryMapper } from '@domain/categories/mappers/category-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { type UpdateCategoryStatusBody, updateCategoryStatusBody, type UpdateCategoryStatusParams, updateCategoryStatusParams } from './update-category-status-dto';
import { UpdateCategoryStatusService } from './update-category-status-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateCategoryStatusBody, params: updateCategoryStatusParams })
export class UpdateCategoryStatusController extends Controller<CategoryHttpSchema> {
  constructor(
    @Inject('UpdateCategoryStatusService')
    private readonly updateCategoryStatusService: UpdateCategoryStatusService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateCategoryStatusBody, never, UpdateCategoryStatusParams>): Controller.HandleResponse<CategoryHttpSchema> {
    const category = await this.updateCategoryStatusService.execute({
      ...request.body,
      ...request.params,
    });

    return CategoryMapper.toHttp(category);
  }
}
