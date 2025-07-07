import { Account } from '../entities/account';
import { AccountOrderBy, OrderDirection } from '../use-cases/get-accounts/get-accounts-dto';

export interface IAccountsParams {
  page?: number;
  perPage?: number;
  orderBy?: AccountOrderBy;
  orderDirection?: OrderDirection;
  isActive?: boolean;
}

export interface IGetAccountsResponse {
  accounts: Account[];
  totalAccounts: number;
}

export interface IAccountRepository {
  create(account: Account): Promise<void>;
  findByEmail(email: string): Promise<Account | null>;
  findById(accountId: string): Promise<Account | null>;
  update(account: Account): Promise<void>;
  delete(accountId: string): Promise<void>;
  findAll(params: IAccountsParams): Promise<IGetAccountsResponse>;
}
