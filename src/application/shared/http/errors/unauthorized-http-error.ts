import { StatusCode } from '../status-code';
import { type ErrorMessage, HttpError } from './http-error';

export class UnauthorizedHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(StatusCode.UNAUTHORIZED, message);
  }
}
