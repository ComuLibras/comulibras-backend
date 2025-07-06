import { generateSchema } from '@anatine/zod-openapi';
import { Account as RawAccount, Prisma } from '@prisma/client';
import { z } from 'zod';

import { Account } from '@domain/accounts/entities/account';
import { Roles } from '@domain/accounts/entities/role';

export class AccountMapper {
  static toPersistence(domain: Account): Prisma.AccountCreateInput {
    return domain.toPrisma();
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
    return domain.toHttp();
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
