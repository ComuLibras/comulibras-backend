import { prismaClient } from '@shared/clients/prisma-client';

import { Account } from '../entities/account';
import { AccountMapper } from '../mappers/account-mapper';

import {
  IAccountRepository,
  IAccountsParams,
  IGetAccountsResponse,
} from './account-repository';

export class PrismaAccountRepository implements IAccountRepository {
  async updateAccount(account: Account): Promise<void> {
    await prismaClient.account.update({
      where: { id: account.id },
      data: AccountMapper.toPersistence(account),
    });
  }

  async getAccountById(accountId: string): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: { id: accountId },
    });

    return account ? AccountMapper.toDomain(account) : null;
  }

  async deleteAccount(accountId: string): Promise<void> {
    await prismaClient.account.delete({
      where: { id: accountId },
    });
  }

  async createAccount(account: Account): Promise<void> {
    await prismaClient.account.create({
      data: AccountMapper.toPersistence(account),
    });
  }

  async getAccounts({
    page = 1,
    perPage = 10,
  }: IAccountsParams): Promise<IGetAccountsResponse> {
    const totalAccounts = await prismaClient.account.count();
    const accounts = await prismaClient.account.findMany({
      take: perPage,
      skip: page ? (page - 1) * perPage : 0,
    });

    return {
      accounts: accounts.map(AccountMapper.toDomain),
      totalAccounts,
    };
  }

  async getAccountByEmail(email: string): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    return account ? AccountMapper.toDomain(account) : null;
  }
}
