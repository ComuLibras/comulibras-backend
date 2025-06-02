import { Entity, IEntityProps } from '../../../shared/entities/entity';
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

  public get name(): string {
    return this.props.name;
  }

  public get email(): string {
    return this.props.email;
  }

  public get password(): string | null {
    return this.props.password ?? null;
  }

  public get role(): Roles {
    return this.props.role;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public get isPasswordCreated(): boolean {
    return this.props.isPasswordCreated;
  }
}
