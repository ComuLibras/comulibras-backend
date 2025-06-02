import { StatusCode } from '../status-code';
import { type ErrorMessage, HttpError } from './http-error';

export class NotFoundHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(StatusCode.NOT_FOUND, message);
  }
}
