import { SignInSchema } from '@domain/auth/docs/sign-in-swagger';

import { HttpResponse } from '@kernel/decorators/http-response';
import { Inject } from '@kernel/decorators/inject';
import { Injectable } from '@kernel/decorators/injectable';
import { Schema } from '@kernel/decorators/schema';

import { Controller } from '@shared/http/interfaces/controller';
import { StatusCode } from '@shared/http/status-code';

import { SignInBody, signInBody } from './sign-in-dto';
import { SignInService } from './sing-in-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: signInBody })
export class SignInController extends Controller<SignInSchema> {
  constructor(
    @Inject('SignInService') private readonly signInService: SignInService,
  ) {
    super();
  }

  protected override async handle(
    request: Http.Request<SignInBody>,
  ): Controller.HandleResponse<SignInSchema> {
    const { accessToken, role } = await this.signInService.execute(
      request.body,
    );

    return {
      accessToken,
      role,
    };
  }
}
