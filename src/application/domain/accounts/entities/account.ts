import { Prisma } from '@prisma/client';

import { Entity, IEntityProps } from '@shared/entities/entity';

import { AccountHttpSchema } from '../mappers/account-mapper';

import { Roles } from './role';

interface IAccountProps extends IEntityProps {
  name: string;
  email: string;
  password?: string | null;
  role: Roles;
  isActive: boolean;
  isPasswordCreated: boolean;
}

export class Account extends Entity {
  readonly props: IAccountProps;

  constructor(props: IAccountProps) {
    super(props);
    this.props = props;
  }

  public updateRole(role: Roles): void {
    this.props.role = role;
  }

  public updateStatus(isActive: boolean): void {
    this.props.isActive = isActive;
  }

  public toPrisma(): Prisma.AccountCreateInput {
    const domain = this.props;

    return {
      id: domain.id,
      name: domain.name,
      email: domain.email,
      role: domain.role,
      password: domain.password,
      isActive: domain.isActive,
      isPasswordCreated: domain.isPasswordCreated,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public toHttp(): AccountHttpSchema {
    const domain = this.props;

    return {
      id: domain.id ?? '',
      name: domain.name,
      email: domain.email,
      role: domain.role,
      createdAt: domain.createdAt ?? new Date(),
      updatedAt: domain.updatedAt ?? new Date(),
      isActive: domain.isActive,
      isPasswordCreated: domain.isPasswordCreated,
    };
  }
}
