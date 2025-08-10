import { ICategoryRepository } from '@domain/categories/repositories/category-repository';
import { IGetSentencesResponse, ISentenceRepository } from '@domain/sentences/repositories/sentence-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { NotFoundHTTPError } from '@shared/http/errors/not-found-http-error';
import { IService } from '@shared/http/interfaces/service';

import { GetSentencesQuery } from './get-sentences-dto';

@Injectable()
export class GetSentencesService implements IService<GetSentencesService.Input, GetSentencesService.Output> {
  constructor(
    @Inject('SentenceRepository')
    private readonly sentenceRepo: ISentenceRepository,

    @Inject('CategoryRepository')
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(input: GetSentencesService.Input): Promise<GetSentencesService.Output> {
    let categoryName = 'Sem categoria';

    if (input.categoryId) {
      const category = await this.categoryRepo.findById(input.categoryId);
      categoryName = category?.props.name ?? 'Sem categoria';
      if (!category) {
        throw new NotFoundHTTPError('Categoria não encontrada');
      }
    }

    const { sentences } = await this.sentenceRepo.findAll(input);

    return {
      sentences: sentences,
      categoryName,
      categoryId: input.categoryId ?? null,
    };
  }
}

export namespace GetSentencesService {
  export type Input = GetSentencesQuery & { account?: Http.Account };
  export type Output = IGetSentencesResponse & { categoryName: string; categoryId: string | null };
}
