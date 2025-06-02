import { HttpResponse } from '../../../../kernel/decorators/http-response';
import { Inject } from '../../../../kernel/decorators/inject';
import { Injectable } from '../../../../kernel/decorators/injectable';
import { Schema } from '../../../../kernel/decorators/schema';
import { Controller } from '../../../../shared/http/interfaces/controller';
import { StatusCode } from '../../../../shared/http/status-code';
import { SignUpSchema } from '../../docs/sign-up-swagger';
import { SignUpBody, signUpBody } from './sign-up-dto';
import { SignUpService } from './sing-up-service';

@Injectable()
@HttpResponse(StatusCode.OK)
@Schema({ body: signUpBody })
export class SignUpController extends Controller<SignUpSchema> {
  constructor(
    @Inject('SignUpService') private readonly signUpService: SignUpService,
  ) {
    super();
  }

  protected override async handle(
    request: Http.Request<SignUpBody>,
  ): Controller.HandleResponse<SignUpSchema> {
    const { accessToken, role } = await this.signUpService.execute(
      request.body,
    );

    return {
      accessToken,
      role,
    };
  }
}
