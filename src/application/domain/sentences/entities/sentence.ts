import { Entity, IEntityProps } from '../../../shared/entities/entity';

interface ISentenceProps extends IEntityProps {
  content: string;
  videoUrl: string;
  categoryId: string;
  isActive: boolean;
}

export class Sentence extends Entity {
  readonly props: ISentenceProps;

  constructor(props: ISentenceProps) {
    super(props);
    this.props = props;
  }

  public get content(): string {
    return this.props.content;
  }

  public get videoUrl(): string {
    return this.props.videoUrl;
  }

  public get categoryId(): string {
    return this.props.categoryId;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }
}
