import { getHttpResponse } from '@kernel/decorators/http-response';
import { Schemas, getSchema } from '@kernel/decorators/schema';

export abstract class Controller<TBody = unknown> {
  protected abstract handle(
    request: Http.Request,
  ): Controller.HandleResponse<TBody>;

  public async execute(request: Http.Request): Promise<Http.Response<TBody>> {
    const body = this.validateRequest(request, 'body');
    const query = this.validateRequest(request, 'query');
    const params = this.validateRequest(request, 'params');

    const response = await this.handle({
      ...request,
      body,
      query,
      params,
    });

    return {
      statusCode: getHttpResponse(this),
      body: response,
    };
  }

  private validateRequest(request: Http.Request, key: keyof Schemas) {
    const schema = getSchema(this, key);
    if (!schema) {
      return request[key];
    }

    return schema.parse(request[key]);
  }
}

export namespace Controller {
  export type HandleResponse<TBody = unknown> = Promise<
    Http.Response<TBody>['body']
  >;
}
