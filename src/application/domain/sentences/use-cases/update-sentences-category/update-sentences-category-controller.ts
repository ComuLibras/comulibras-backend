
import { SentenceHttpSchema, SentenceMapper } from '@domain/sentences/mappers/sentence-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { type UpdateSentencesCategoryBody, updateSentencesCategoryBody } from './update-sentences-category-dto';
import { UpdateSentencesCategoryService } from './update-sentences-category-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateSentencesCategoryBody })
export class UpdateSentencesCategoryController extends Controller<SentenceHttpSchema[]> {
  constructor(
    @Inject('UpdateSentencesCategoryService')
    private readonly updateSentencesCategoryService: UpdateSentencesCategoryService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateSentencesCategoryBody>): Controller.HandleResponse<SentenceHttpSchema[]> {
    const sentences = await this.updateSentencesCategoryService.execute(request.body);

    return sentences.map(SentenceMapper.toHttp);
  }
}
