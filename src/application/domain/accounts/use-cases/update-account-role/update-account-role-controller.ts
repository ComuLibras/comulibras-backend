
import { AccountHttpSchema, AccountMapper } from '@domain/accounts/mappers/account-mapper';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { UpdateAccountRoleBody, updateAccountRoleBody, UpdateAccountRoleParams, updateAccountRoleParams } from './update-account-role-dto';
import { UpdateAccountRoleService } from './update-account-role-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: updateAccountRoleBody, params: updateAccountRoleParams })
export class UpdateAccountRoleController extends Controller<AccountHttpSchema> {
  constructor(
    @Inject('UpdateAccountRoleService')
    private readonly updateAccountRoleService: UpdateAccountRoleService,
  ) {
    super();
  }

  protected override async handle(request: Http.Request<UpdateAccountRoleBody, never, UpdateAccountRoleParams>): Controller.HandleResponse<AccountHttpSchema> {
    const account = await this.updateAccountRoleService.execute({
      ...request.body,
      ...request.params,
    });

    return AccountMapper.toHttp(account);
  }
}
