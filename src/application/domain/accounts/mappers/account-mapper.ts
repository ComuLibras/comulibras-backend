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
      isActive: data.isActive,
      isPasswordCreated: data.isPasswordCreated,
    });
  }

  static toHttp(domain: Account): AccountHttpSchema {
    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      role: domain.role,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      isActive: domain.isActive,
      isPasswordCreated: domain.isPasswordCreated,
    };
  }
}

export const accountHttpSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  role: z.nativeEnum(Roles),
  isActive: z.boolean(),
  isPasswordCreated: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const accountHttpSchemaOpenAPI = generateSchema(accountHttpSchema);

export type AccountHttpSchema = z.infer<typeof accountHttpSchema>;
