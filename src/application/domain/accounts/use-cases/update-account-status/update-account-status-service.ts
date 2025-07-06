import { ACCOUNT_NOT_FOUND_ERROR } from '@domain/accounts/docs/constants';
import { Account } from '@domain/accounts/entities/account';
import { IAccountRepository } from '@domain/accounts/repositories/account-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { UpdateAccountStatusBody, UpdateAccountStatusParams } from './update-account-status-dto';

@Injectable()
export class UpdateAccountStatusService implements IService<UpdateAccountStatusService.Input, UpdateAccountStatusService.Output> {
  constructor(
    @Inject('AccountRepository')
    private readonly accountRepo: IAccountRepository,
  ) {}

  async execute(input: UpdateAccountStatusService.Input): Promise<UpdateAccountStatusService.Output> {
    const account = await this.accountRepo.getAccountById(input.accountId);

    if (!account) {
      throw new NotFoundHTTPError(ACCOUNT_NOT_FOUND_ERROR);
    }

    account.updateStatus(input.isActive);

    await this.accountRepo.updateAccount(account);

    return account;
  }
}

export namespace UpdateAccountStatusService {
  export type Input = UpdateAccountStatusBody & UpdateAccountStatusParams;
  export type Output = Account;
}
