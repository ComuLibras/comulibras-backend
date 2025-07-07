
import { Category } from '@domain/categories/entities/category';
import { ICategoryRepository } from '@domain/categories/repositories/category-repository';

import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';

import { IService } from '@shared/http/interfaces/service';

import { GetCategoriesQuery } from './get-categories-dto';

@Injectable()
export class GetCategoriesService implements IService<GetCategoriesService.Input, GetCategoriesService.Output> {
  constructor(
    @Inject('CategoryRepository')
    private readonly categoryRepo: ICategoryRepository,
  ) {}

  async execute(input: GetCategoriesService.Input): Promise<GetCategoriesService.Output> {
    const categoriesResponse = await this.categoryRepo.findAll(input);

    return categoriesResponse;
  }
}

export namespace GetCategoriesService {
  export type Input = GetCategoriesQuery & { account?: Http.Account; onlyActive: boolean };
  export type Output = Category[];
}
