import { StatusCode } from '../status-code';
import { ErrorMessage, HttpError } from './http-error';

export class ConflictHTTPError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(StatusCode.CONFLICT, message);
  }
}
