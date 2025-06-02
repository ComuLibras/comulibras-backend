import { Sentence } from '../entities/sentence';

export interface ISentenceRepository {
  create(sentence: Sentence): Promise<void>;
  findAll(): Promise<Sentence[]>;
  findById(id: string): Promise<Sentence | null>;
  update(sentence: Sentence): Promise<void>;
  delete(id: string): Promise<void>;
}
