
import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { DeleteAccountParams, deleteAccountParams } from './delete-account-dto';
import { DeleteAccountService } from './delete-account-service';

@Injectable()
@HttpResponse(StatusCode.NO_CONTENT)
@Schema({ params: deleteAccountParams })
export class DeleteAccountController extends Controller<void> {
  constructor(
    @Inject('DeleteAccountService') private readonly deleteAccountService: DeleteAccountService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<never, never, DeleteAccountParams>): Controller.HandleResponse<void> {
    await this.deleteAccountService.execute(request.params);
  }
}
