import { Prisma } from '@prisma/client';

import { Entity, IEntityProps } from '@shared/entities/entity';

import { CategoryHttpSchema } from '../mappers/category-mapper';

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

  public increaseSentenceCount() {
    this.props.sentenceCount = (this.props.sentenceCount ?? 0) + 1;
  }

  public decreaseSentenceCount() {
    this.props.sentenceCount = (this.props.sentenceCount ?? 0) - 1;
  }

  public update(props: Partial<ICategoryProps>) {
    this.props.name = props.name ?? this.props.name;
    this.props.color = props.color ?? this.props.color;
    this.props.icon = props.icon ?? this.props.icon;
    this.onUpdated();
  }

  public toPrisma(): Prisma.CategoryCreateInput {
    const domain = this.props;

    return {
      id: domain.id,
      name: domain.name,
      sentenceCount: domain.sentenceCount,
      color: domain.color,
      icon: domain.icon,
      isActive: domain.isActive,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
    };
  }

  public toHttp(): CategoryHttpSchema {
    const domain = this.props;

    return {
      id: domain.id ?? '',
      name: domain.name,
      sentenceCount: domain.sentenceCount ?? 0,
      color: domain.color,
      icon: domain.icon,
      isActive: domain.isActive,
      createdAt: domain.createdAt ?? new Date(),
      updatedAt: domain.updatedAt ?? new Date(),
    };
  }
}
