import { generateSchema } from '@anatine/zod-openapi';
import { z } from 'zod';
import {
  Prisma,
  Account as RawAccount,
} from '../../../../../prisma/generated/prisma';
import { Account } from '../entities/account';
import { Roles } from '../entities/role';

export class AccountMapper {
  static toPersistence(domain: Account): Prisma.AccountCreateInput {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      role: domain.role,
      password: domain.password,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  static toDomain(data: RawAccount): Account {
    return new Account({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role as Roles,
      password: data.password,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    });
  }

  static toHttp(domain: Account) {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      role: domain.role,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }
}

export const accountHttpSchema = generateSchema(
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(Roles),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  }),
);
