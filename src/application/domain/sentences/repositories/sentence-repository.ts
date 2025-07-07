import { Sentence } from '../entities/sentence';
import { type GetSentencesService } from '../use-cases/get-sentences/get-sentences-service';

export interface IGetSentencesResponse {
  sentences: Sentence[];
  totalSentences: number;
}

export interface ISentenceRepository {
  create(sentence: Sentence): Promise<void>;
  findAll(input: GetSentencesService.Input): Promise<IGetSentencesResponse>;
  findById(id: string): Promise<Sentence | null>;
  findByIds(ids: string[]): Promise<Sentence[]>;
  findByContent(content: string, categoryId: string | null): Promise<Sentence | null>;
  update(sentence: Sentence): Promise<void>;
  updateManyCategoryId(sentencesIds: string[], categoryId: string): Promise<void>;
  delete(id: string): Promise<void>;
  deleteMany(ids: string[]): Promise<void>;
}
