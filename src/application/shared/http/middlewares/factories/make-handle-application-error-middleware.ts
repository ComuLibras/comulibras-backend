import { HandleApplicationErrorMiddleware } from '@shared/http/middlewares/handle-application-error-middleware';

export function makeHandleApplicationErrorMiddleware() {
  return new HandleApplicationErrorMiddleware();
}
