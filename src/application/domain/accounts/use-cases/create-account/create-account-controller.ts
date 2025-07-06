
import { AccountHttpSchema, AccountMapper } from '@domain/accounts/mappers/account-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { CreateAccountBody, createAccountBody } from './create-account-dto';
import { CreateAccountService } from './create-account-service';

@Injectable()
@HttpResponse(StatusCode.CREATED)
@Schema({ body: createAccountBody })
export class CreateAccountController extends Controller<AccountHttpSchema> {
  constructor(
    @Inject('CreateAccountService') private readonly createAccountService: CreateAccountService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<CreateAccountBody>): Controller.HandleResponse<AccountHttpSchema> {
    const account = await this.createAccountService.execute(request.body);

    return AccountMapper.toHttp(account);
  }
}
