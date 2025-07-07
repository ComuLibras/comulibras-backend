
import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { DeleteSentencesBody, deleteSentencesBody } from './delete-sentences-dto';
import { DeleteSentencesService } from './delete-sentences-service';

@Injectable()
@HttpResponse(StatusCode.NO_CONTENT)
@Schema({ body: deleteSentencesBody })
export class DeleteSentencesController extends Controller {

  constructor(
    @Inject('DeleteSentencesService')
    private readonly deleteSentencesService: DeleteSentencesService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<DeleteSentencesBody>): Promise<Controller.HandleResponse<void>> {
    await this.deleteSentencesService.execute(request.body);
  }
}
