import { prismaClient } from '@shared/clients/prisma-client';

import { Account } from '../entities/account';
import { AccountMapper } from '../mappers/account-mapper';

import {
  IAccountRepository,
  IAccountsParams,
  IGetAccountsResponse,
} from './account-repository';

export class PrismaAccountRepository implements IAccountRepository {
  async update(account: Account): Promise<void> {
    await prismaClient.account.update({
      where: { id: account.id },
      data: AccountMapper.toPersistence(account),
    });
  }

  async findById(accountId: string): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: { id: accountId },
    });

    return account ? AccountMapper.toDomain(account) : null;
  }

  async delete(accountId: string): Promise<void> {
    await prismaClient.account.delete({
      where: { id: accountId },
    });
  }

  async create(account: Account): Promise<void> {
    await prismaClient.account.create({
      data: AccountMapper.toPersistence(account),
    });
  }

  async findAll({
    page = 1,
    perPage = 10,
    orderBy,
    orderDirection = 'asc',
    isActive,
  }: IAccountsParams): Promise<IGetAccountsResponse> {
    const whereClause = isActive !== undefined ? { isActive } : {};

    const orderByField = orderBy ? this.mapOrderByField(orderBy) : 'name';

    const [totalAccounts, accounts] = await Promise.all([
      prismaClient.account.count({ where: whereClause }),
      prismaClient.account.findMany({
        take: perPage,
        skip: page ? (page - 1) * perPage : 0,
        where: whereClause,
        orderBy: {
          [orderByField]: orderDirection,
        },
      }),
    ]);

    return {
      accounts: accounts.map(AccountMapper.toDomain),
      totalAccounts,
    };
  }

  private mapOrderByField(orderBy: string): string {
    const fieldMap: Record<string, string> = {
      name: 'name',
      email: 'email',
      role: 'role',
      isPasswordCreated: 'isPasswordCreated',
      isActive: 'isActive',
    };

    return fieldMap[orderBy] || 'name';
  }

  async findByEmail(email: string): Promise<Account | null> {
    const account = await prismaClient.account.findUnique({
      where: { email },
    });

    return account ? AccountMapper.toDomain(account) : null;
  }
}
