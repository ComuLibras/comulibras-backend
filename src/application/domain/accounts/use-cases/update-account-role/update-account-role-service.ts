import { ACCOUNT_NOT_FOUND_ERROR } from '@domain/accounts/docs/constants';
import { Account } from '@domain/accounts/entities/account';
import { IAccountRepository } from '@domain/accounts/repositories/account-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { UpdateAccountRoleBody, UpdateAccountRoleParams } from './update-account-role-dto';

@Injectable()
export class UpdateAccountRoleService implements IService<UpdateAccountRoleService.Input, UpdateAccountRoleService.Output> {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(input: UpdateAccountRoleService.Input): Promise<UpdateAccountRoleService.Output> {
    const account = await this.accountRepo.findById(input.accountId);

    if (!account) {
      throw new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR);
    }

    account.updateRole(input.role);

    await this.accountRepo.update(account);

    return account;
  }
}

export namespace UpdateAccountRoleService {
  export type Input = UpdateAccountRoleBody & UpdateAccountRoleParams;
  export type Output = Account;
}
