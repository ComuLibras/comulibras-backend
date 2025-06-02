import { Account } from "../entities/account";

export interface IAccountsParams {
  page?: number;
  perPage?: number;
}

export interface IGetAccountsResponse {
  accounts: Account[];
  totalAccounts: number;
}

export interface IAccountRepository {
  createAccount(account: Account): Promise<void>;
  getAccountByEmail(email: string): Promise<Account | null>;
}
