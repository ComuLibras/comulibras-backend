import { container } from '.';
import { PrismaAccountRepository } from '../../../domain/accounts/repositories/prisma-account-respository';

export function registerRepositories() {
  container.register(PrismaAccountRepository, 'AccountRepository');
}
