import { StatusCode } from "../status-code";
import { type ErrorMessage, HttpError } from "./http-error";

export class BadRequestHttpError extends HttpError {
  constructor(message?: ErrorMessage) {
    super(StatusCode.BAD_REQUEST, message);
  }
}
