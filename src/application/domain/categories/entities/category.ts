import { Entity, IEntityProps } from '../../../shared/entities/entity';

interface ICategoryProps extends IEntityProps {
  name: string;
  sentenceCount?: number;
  color: string;
  icon: string;
  isActive: boolean;
}

export class Category extends Entity {
  readonly props: ICategoryProps;

  constructor(props: ICategoryProps) {
    super(props);
    this.props = props;
  }

  public get name(): string {
    return this.props.name;
  }

  public get sentenceCount(): number {
    return this.props.sentenceCount ?? 0;
  }

  public get color(): string {
    return this.props.color;
  }

  public get icon(): string {
    return this.props.icon;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }
}
