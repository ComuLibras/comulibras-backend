
import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { DeleteCategoryParams, deleteCategoryParams } from './delete-category-dto';
import { DeleteCategoryService } from './delete-category-service';

@Injectable()
@HttpResponse(StatusCode.NO_CONTENT)
@Schema({ params: deleteCategoryParams })
export class DeleteCategoryController extends Controller<void> {
  constructor(
    @Inject('DeleteCategoryService') private readonly deleteCategoryService: DeleteCategoryService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<never, never, DeleteCategoryParams>): Controller.HandleResponse<void> {
    await this.deleteCategoryService.execute(request.params);
  }
}
