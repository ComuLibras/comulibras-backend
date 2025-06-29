import { CategoryHttpSchema, CategoryMapper } from '@domain/categories/mappers/category-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { CreateCategoryBody, createCategoryBody } from './create-category-dto';
import { CreateCategoryService } from './create-category-service';

@Injectable()
@HttpResponse(StatusCode.CREATED)
@Schema({ body: createCategoryBody })
export class CreateCategoryController extends Controller {

  constructor(
    @Inject('CreateCategoryService')
    private readonly createCategoryService: CreateCategoryService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<CreateCategoryBody>): Promise<Controller.HandleResponse<CategoryHttpSchema>> {
    const category = await this.createCategoryService.execute(request.body);

    return CategoryMapper.toHttp(category);
  }
}
