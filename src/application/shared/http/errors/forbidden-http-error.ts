import { StatusCode } from '../status-code';
import { type ErrorMessage, HttpError } from './http-error';

export class ForbiddenHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(StatusCode.FORBIDDEN, message);
  }
}
