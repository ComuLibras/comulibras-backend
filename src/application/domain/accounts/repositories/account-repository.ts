import { Account } from '../entities/account';

export interface IAccountsParams {
  page?: number;
  perPage?: number;
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
