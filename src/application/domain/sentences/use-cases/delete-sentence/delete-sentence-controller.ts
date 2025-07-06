
import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { DeleteSentenceParams, deleteSentenceParams } from './delete-sentence-dto';
import { DeleteSentenceService } from './delete-sentence-service';

@Injectable()
@HttpResponse(StatusCode.NO_CONTENT)
@Schema({ params: deleteSentenceParams })
export class DeleteSentenceController extends Controller {

  constructor(
    @Inject('DeleteSentenceService')
    private readonly deleteSentenceService: DeleteSentenceService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<never, never, DeleteSentenceParams>): Promise<Controller.HandleResponse<void>> {
    await this.deleteSentenceService.execute(request.params);
  }
}
